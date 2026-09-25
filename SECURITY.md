# Security Policy

## Supported versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

Only the latest release on `main` receives security fixes. If you are on an
older commit, update before reporting.

## Reporting a vulnerability

**Do not open a public issue for security vulnerabilities.**

Please report them privately through GitHub Security Advisories:

1. Open [Report a vulnerability](https://github.com/bilalmlkdev/palettesnap/security/advisories/new)
2. Describe the issue, the affected files or endpoints, and how to reproduce it
3. Add a proof of concept if you have one

If you cannot use advisories, email **bilalmlkdev@gmail.com** with the subject
`PaletteSnap security report`.

You will get a response within **7 days**. Please allow up to **90 days** for a
fix and a coordinated disclosure date before writing a public write-up.

## Safe harbor

Good faith research that follows this policy will not lead to legal action. You
will not be penalized for an accidental finding as long as you:

- Do not access, modify, or delete data that is not yours
- Do not degrade the availability of PaletteSnap (no DDoS, no spam)
- Report the issue privately first
- Give reasonable time for a fix before publishing

## Scope

In scope:

- Cross-site scripting (XSS) and content injection in the app
- Exposure of other users' device ids or like history
- Supabase misconfiguration, such as missing row level security
- Privilege escalation beyond what the anonymous model is supposed to allow

Out of scope:

- Denial of service and volumetric attacks
- Social engineering of contributors
- Reports that require physical access to a user's device
- Vulnerabilities in third party dependencies that have no impact on this app

## Attribution

This policy is inspired by common open source security policies and is not a
legally binding contract.
