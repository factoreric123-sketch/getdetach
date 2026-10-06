import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Html, Link, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ShippingConfirmationProps {
  customerName?: string
}

const ShippingConfirmationEmail = ({ customerName }: ShippingConfirmationProps) => {
  const firstName = (customerName || '').trim().split(/\s+/)[0] || ''
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Good news! Your Detach card has been shipped and is officially on its way.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={text}>{firstName ? `Hi ${firstName},` : 'Hi,'}</Text>

          <Text style={text}>
            Good news! Your Detach card has been shipped and is officially on its way.
          </Text>

          <Text style={text}>
            Orders are mailed via <Link href="https://www.usps.com" style={{ color: '#222', textDecoration: 'none' }}>USPS</Link> using a non-machinable stamp. Because this type of mail does not include tracking, you will not receive a tracking number or delivery confirmation.
          </Text>

          <Text style={text}>
            In the meantime, remember that you can still use the QR code. You can print it out, tape it to an old card you no longer use, or even attach it to a small piece of cardboard and use it just like your Detach card.
          </Text>

          <Text style={text}>
            Thank you so much for your order and for supporting Detach. We're excited for you to start using it!
          </Text>

          <Text style={closing}>
            Best,<br />
            Eric<br />
            Detach
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Questions? Contact us at getdetach@gmail.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ShippingConfirmationEmail,
  subject: 'Your Detach Card Has Shipped',
  displayName: 'Shipping confirmation',
  previewData: { customerName: 'Jane Doe' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '40px 24px', maxWidth: '580px', margin: '0 auto' }
const text = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const closing = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const hr = { borderColor: '#eee', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#999', margin: '0' }
