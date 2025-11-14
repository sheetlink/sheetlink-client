# Template Gallery - Creator Guide

This document describes how to create, submit, and manage templates for the SheetLink Community Gallery.

## Overview

The Template Gallery allows creators to share pre-built Google Sheets templates with the SheetLink community. Templates can include:

- Budgeting frameworks (zero-based, 50/30/20, envelope method)
- Net worth trackers
- Cash flow analysis
- Debt payoff calculators
- Investment portfolios
- Custom dashboards

## Template Requirements

### Technical Requirements

1. **Google Sheets Format**
   - Must be a valid Google Sheets document
   - Should be set to "Anyone with link can view"
   - Cannot contain sensitive or personal data

2. **Structure**
   - Clear, documented structure
   - Named ranges (optional but recommended)
   - Data validation where appropriate
   - Formatted headers and sections

3. **Compatibility**
   - Works with SheetLink Plaid sync
   - Includes standard tabs: `Accounts`, `Transactions`, `Rules`
   - Optional additional tabs for analysis/dashboards

### Content Requirements

1. **Documentation**
   - Clear instructions within the template
   - Explanation of formulas/calculations
   - Example data (anonymized)

2. **Quality**
   - Professional appearance
   - Tested functionality
   - Error-free formulas
   - Responsive design

3. **Originality**
   - Must be your own work or properly attributed
   - No copyrighted content without permission

## Creating a Template

### Step 1: Design Your Template

1. Create a new Google Sheet
2. Add necessary tabs:
   - `README` - Instructions and overview
   - `Accounts` - Account balances (synced by SheetLink)
   - `Transactions` - Transaction data (synced by SheetLink)
   - `Rules` - Categorization rules
   - Additional custom tabs for your specific use case

3. Add formulas and formatting
4. Include sample data to demonstrate functionality
5. Test thoroughly

### Step 2: Prepare for Submission

1. **Set Sharing Permissions**
   ```
   File → Share → Get link
   Set to: "Anyone with the link can view"
   ```

2. **Clean Up**
   - Remove any personal information
   - Verify all formulas work
   - Check for broken references
   - Ensure consistent formatting

3. **Create a Thumbnail** (Optional)
   - Take a screenshot of your template
   - Recommended size: 1200x630px
   - Upload to a public image host

4. **Write Description**
   - Clear, concise title (max 255 characters)
   - Detailed description (10-2000 characters)
   - Include use case and key features
   - List any requirements or prerequisites

### Step 3: Submit Your Template

#### Via API (Programmatic)

```bash
curl -X POST http://localhost:8000/templates/submit \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Zero-Based Budget Template",
    "description": "Track every dollar with this comprehensive zero-based budgeting template. Includes monthly planning, expense tracking, and savings goals. Perfect for beginners and advanced budgeters alike.",
    "sheet_url": "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit",
    "category": "budgeting",
    "creator_name": "Your Name",
    "thumbnail_url": "https://example.com/thumbnail.png"
  }'
```

#### Via Extension (Coming Soon)

Future versions will include a template submission form directly in the extension.

## Template Categories

Choose the most appropriate category for your template:

- **budgeting** - Budget planning and tracking
- **tracking** - General expense/income tracking
- **analysis** - Financial analysis and insights
- **net-worth** - Net worth calculators
- **cash-flow** - Cash flow projections
- **debt-payoff** - Debt reduction strategies
- **investment** - Investment tracking
- **other** - Other financial templates

## Approval Process

### Review Criteria

Templates are reviewed for:

1. **Functionality** - Does it work as described?
2. **Quality** - Professional appearance and usability
3. **Safety** - No malicious scripts or data collection
4. **Compliance** - Meets all requirements
5. **Value** - Provides genuine utility to users

### Timeline

- Initial review: 3-5 business days
- Revisions (if needed): 2-3 business days
- Approval notification via email

### Status Tracking

Check your template status:

```bash
GET /templates/{template_id}
```

Status values:
- `approved: false` - Pending review
- `approved: true` - Live in gallery

## Template Management

### Updating Your Template

To update an existing template:

1. Make changes to your Google Sheet
2. The URL remains the same, so changes are automatic
3. Major changes should be communicated to users

Note: The backend doesn't need to be updated unless you want to change the title, description, or metadata.

### Analytics

Track your template's performance:

```bash
GET /templates/{template_id}
```

Returns:
- `installs` - Total number of installations
- `conversions` - Users who upgraded to paid after using your template

### Featured Templates

High-quality, popular templates may be featured in the gallery. Featured templates:
- Appear at the top of the list
- Get prominent placement
- Receive a "Featured" badge

Contact the SheetLink team to request featured status.

## Creator Program (Future)

### Revenue Sharing

Coming soon: Earn a percentage of subscriptions when users:
1. Install your template
2. Upgrade to a paid plan within 30 days

### Affiliate Links

Templates may include affiliate codes for tracking conversions.

### Creator Dashboard

Future versions will include a creator dashboard showing:
- Install analytics
- Conversion rates
- Earnings (when revenue sharing launches)
- User feedback

## Best Practices

### Template Design

1. **Keep It Simple**
   - Start with essential features
   - Add complexity gradually
   - Provide a "Quick Start" tab

2. **Mobile-Friendly**
   - Works well on mobile devices
   - Readable at small screen sizes
   - Touch-friendly controls

3. **Performance**
   - Minimize complex formulas
   - Use named ranges
   - Avoid circular references

4. **Accessibility**
   - High contrast colors
   - Clear labels
   - Helpful error messages

### Documentation

1. **In-Template Instructions**
   - Dedicated README or Instructions tab
   - Step-by-step setup guide
   - FAQ section

2. **Formula Explanations**
   - Comment complex formulas
   - Provide examples
   - Link to additional resources

3. **Video Walkthrough** (Optional)
   - Create a YouTube tutorial
   - Include link in description
   - Show real-world usage

## Example Templates

### Zero-Based Budget

**Description**: Assign every dollar a job. Track income, expenses, and savings goals with this comprehensive zero-based budgeting template.

**Key Features**:
- Monthly budget planning
- Expense categorization
- Savings goal tracker
- Debt payoff calculator
- Visual dashboards

**Target Audience**: Beginners to intermediate budgeters

### Net Worth Tracker

**Description**: Monitor your financial progress over time. Track assets, liabilities, and calculate net worth automatically.

**Key Features**:
- Asset tracking (cash, investments, property)
- Liability tracking (loans, credit cards)
- Historical charts
- Net worth trends
- Investment performance

**Target Audience**: Anyone building wealth

### Cash Flow Forecast

**Description**: Project your future cash position based on income, expenses, and one-time events.

**Key Features**:
- 12-month projection
- Scenario planning
- Break-even analysis
- Seasonal adjustments
- What-if calculator

**Target Audience**: Business owners, freelancers

## Support

### Questions?

- **Email**: support@finsync.app
- **Discord**: discord.gg/finsync (coming soon)
- **Documentation**: docs.finsync.app

### Reporting Issues

If you notice issues with your template after approval:

1. Update your Google Sheet directly (same URL)
2. If metadata needs updating, contact support
3. Critical issues: Email support immediately

## API Reference

### Submit Template

```http
POST /templates/submit
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "sheet_url": "string",
  "category": "string",
  "creator_name": "string",
  "thumbnail_url": "string" (optional)
}
```

### List Templates

```http
GET /templates?category={category}&featured={boolean}&limit={number}
```

### Get Template

```http
GET /templates/{template_id}
```

### Record Install (Automatic)

```http
POST /templates/install

{
  "template_id": number,
  "user_id": "string" (optional)
}
```

## Terms & Conditions

By submitting a template, you agree to:

1. Grant SheetLink permission to distribute your template
2. Maintain the sheet availability (public view link)
3. Not include malicious code or data harvesting
4. Provide accurate descriptions
5. Respect intellectual property rights
6. Accept moderation decisions

SheetLink reserves the right to:

- Remove templates that violate guidelines
- Feature high-quality templates
- Modify the creator program terms
- Request updates to non-compliant templates

---

**Ready to share your template?** Start creating and submit via the API above!

Questions? Check out our [FAQ](./FAQ.md) or contact support.
