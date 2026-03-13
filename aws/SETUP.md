# AWS Hosting Setup — www.sushantshelke.com

One-time AWS setup to host the portfolio on S3 + CloudFront with a custom domain.  
All console steps are in region **eu-west-2** (London) unless noted otherwise.

---

## Architecture

```
Browser → Route 53 / DNS
            ↓
         CloudFront (HTTPS, CDN, SPA error routing)
            ↓
         S3 bucket (private, OAC)
```

---

## Step 1 — ACM SSL Certificate  ⚠️ Must be in us-east-1

> CloudFront only accepts ACM certs issued in **us-east-1 (N. Virginia)**.

1. Switch region to **us-east-1** in the AWS Console.
2. Go to **Certificate Manager → Request certificate**.
3. Choose **Public certificate** → Next.
4. Add domain names:
   - `www.sushantshelke.com`
   - `sushantshelke.com` (optional, for naked-domain redirect later)
5. Validation method: **DNS validation** (recommended).
6. Click **Request**. Then click into the pending cert and expand each domain.
7. Click **Create records in Route 53** (or add the CNAME records manually at your registrar).
8. Wait a few minutes for status to become **Issued**.

---

## Step 2 — S3 Bucket

1. Go to **S3 → Create bucket**.
2. Bucket name: e.g. `portfolio-web-sushantshelke` (must be globally unique; doesn't need to match the domain).
3. Region: `eu-west-2`.
4. **Block all public access** → ✅ keep all blocked (CloudFront uses OAC, not public URLs).
5. Leave everything else as default → **Create bucket**.

Do **not** enable Static Website Hosting on the bucket — OAC works better without it.

---

## Step 3 — CloudFront Distribution

1. Go to **CloudFront → Create distribution**.

### Origin
| Setting | Value |
|---|---|
| Origin domain | Select your S3 bucket (e.g. `portfolio-web-sushantshelke.s3.eu-west-2.amazonaws.com`) |
| Origin access | **Origin access control settings (recommended)** |
| Origin access control | Click **Create new OAC** → accept defaults → Create |

After saving, CloudFront will prompt you to **copy the S3 bucket policy** — do this in Step 4.

### Default cache behaviour
| Setting | Value |
|---|---|
| Viewer protocol policy | **Redirect HTTP to HTTPS** |
| Allowed HTTP methods | GET, HEAD |
| Cache policy | `CachingOptimized` (or create a custom one) |
| Compress objects automatically | Yes |

### Settings
| Setting | Value |
|---|---|
| Alternate domain names (CNAMEs) | `www.sushantshelke.com` |
| Custom SSL certificate | Select the ACM cert from Step 1 |
| Default root object | `index.html` |
| Price class | Use only North America and Europe (or All, your call) |

### Custom error pages (SPA routing — critical)
Go to the **Error pages** tab after creation and add:

| HTTP error code | Response page path | HTTP response code |
|---|---|---|
| 403 | `/index.html` | 200 |
| 404 | `/index.html` | 200 |

This makes React Router handle all client-side routes.

2. Click **Create distribution**. Note down the **Distribution domain name** (e.g. `d1abc123.cloudfront.net`).

---

## Step 4 — Update S3 Bucket Policy

After creating the distribution, CloudFront shows a banner with the bucket policy JSON.  
Alternatively, copy this policy (replace the placeholders):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipal",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

Go to **S3 → your bucket → Permissions → Bucket policy** and paste it.

---

## Step 5 — DNS Configuration

### If your domain is in Route 53
1. Go to **Route 53 → Hosted zones → sushantshelke.com**.
2. Click **Create record**:
   - Record name: `www`
   - Record type: **A**
   - Toggle **Alias** on
   - Route traffic to: **Alias to CloudFront distribution**
   - Select the distribution from the dropdown
3. Save.

### If your domain is at another registrar (e.g. GoDaddy, Namecheap, Google Domains)
Add a **CNAME** record:
| Host / Name | Value |
|---|---|
| `www` | `d1abc123.cloudfront.net` (your CloudFront domain) |

> DNS propagation can take up to 48 hours, but usually completes within minutes.

---

## Step 6 — IAM User for GitHub Actions

Create a dedicated IAM user with least-privilege permissions for CI/CD.

1. Go to **IAM → Users → Create user**.
2. Name: `portfolio-github-actions`.
3. Attach the following **inline policy**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_BUCKET_NAME",
        "arn:aws:s3:::YOUR_BUCKET_NAME/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::YOUR_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

4. Go to the user → **Security credentials → Create access key** → choose **Third-party service**.
5. Copy the **Access key ID** and **Secret access key**.

---

## Step 7 — GitHub Actions Secrets

In your GitHub repo → **Settings → Secrets → Actions**, add:

| Secret name | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | IAM user access key ID |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret access key |
| `S3_BUCKET_NAME` | Your S3 bucket name |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID (from Step 3) |
| `API_BASE_URL` | Your existing Lambda API base URL |
| `ADMIN_PASSWORD` | Your existing admin password |
| `ADMIN_KEY` | Your existing admin key |

---

## Step 8 — Update Lambda ALLOWED_ORIGIN

In **AWS Lambda → your portfolio Lambda → Configuration → Environment variables**,  
update `ALLOWED_ORIGIN` from `https://sush104.github.io` to `https://www.sushantshelke.com`.

---

## Step 9 — First Deploy

Push to `main` (or trigger the workflow manually in GitHub Actions → **deploy-aws.yml** → Run workflow).  
The workflow will build the Vite app, sync files to S3, and invalidate CloudFront.

Visit `https://www.sushantshelke.com` — it should be live. ✓

---

## Optional — Redirect naked domain (sushantshelke.com → www)

1. Create a second S3 bucket named exactly `sushantshelke.com`.
2. Enable **Static website hosting** on it → set it to **Redirect all requests** to `www.sushantshelke.com` with HTTPS.
3. Create a second CloudFront distribution pointing to this redirect bucket.
4. Add `sushantshelke.com` as a CNAME/Alias A record pointing to the second distribution.
