import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Html, Link, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Detach"

interface OrderNotificationInternalProps {
  customerName?: string
  customerEmail?: string
  quantity?: number
  total?: string
  addressLines?: string
}

const OrderNotificationInternalEmail = ({
  customerName,
  customerEmail,
  quantity = 1,
  total = '9.99',
  addressLines = '',
}: OrderNotificationInternalProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New {SITE_NAME} order confirmed</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={greeting}>{customerName ? `Hi ${customerName},` : 'Hi,'}</Text>

        <Text style={text}>
          Thanks for your order! We've received it and are getting it ready to ship.
        </Text>

        <Text style={sectionHeading}><strong>Order Details</strong></Text>
        <Text style={detailText}>Item: {SITE_NAME}</Text>
        <Text style={detailText}>Quantity: {quantity}</Text>
        <Text style={detailText}>Total: ${total}</Text>
        <Text style={detailText}>Shipping: Free</Text>
        <Text style={detailTextLast}>Status: Confirmed</Text>

        {addressLines ? (
          <Section>
            <Text style={sectionHeading}><strong>Shipping Address</strong></Text>
            {addressLines.split('\n').filter(Boolean).map((line, i) => (
              <Text key={i} style={detailText}>
                <Link href="#" style={{ color: '#222', textDecoration: 'none' }}>{line}</Link>
              </Text>
            ))}
            {customerEmail ? <Text style={detailText}>{customerEmail}</Text> : null}
            <Text style={detailTextLast}> </Text>
          </Section>
        ) : null}

        <Text style={text}>
          Orders are mailed via <Link href="https://www.usps.com" style={{ color: '#222', textDecoration: 'none' }}>USPS</Link> using a non-machinable stamp. Because this type of mail does not include tracking, you will not receive a shipping confirmation, tracking number, or delivery confirmation.
        </Text>

        <Text style={text}>
          We do not ship on Saturdays or Sundays, so weekend orders will be mailed on the next business day. We hope your order arrives in a timely manner.
        </Text>

        <Text style={text}>
          Thanks for supporting {SITE_NAME}!
        </Text>

        <Text style={closing}>
          Best,<br />
          {SITE_NAME}
        </Text>

        <Hr style={hr} />

        <Text style={footer}>
          Questions? Contact us at getdetach@gmail.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderNotificationInternalEmail,
  subject: 'New Detach Order',
  to: 'getdetach@gmail.com',
  displayName: 'Internal order confirmation',
  previewData: {
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    quantity: 1,
    total: '9.99',
    addressLines: 'Jane Doe\n123 Main St\nNew York, NY 10001\nUS',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '40px 24px', maxWidth: '580px', margin: '0 auto' }
const greeting = { fontSize: '15px', color: '#222', margin: '0 0 16px', lineHeight: '1.6' }
const text = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const sectionHeading = { fontSize: '15px', color: '#222', margin: '0 0 6px', lineHeight: '1.6' }
const detailText = { fontSize: '15px', color: '#222', margin: '0', lineHeight: '1.6' }
const detailTextLast = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const listItem = { fontSize: '15px', color: '#222', margin: '0 0 4px', lineHeight: '1.6' }
const listItemLast = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const closing = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const hr = { borderColor: '#eee', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#999', margin: '0' }
