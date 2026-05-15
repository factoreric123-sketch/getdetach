import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Html, Preview, Text, Hr,
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
  customerName = 'there',
  quantity = 1,
  total = '9.99',
}: OrderNotificationInternalProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {SITE_NAME} order has been confirmed</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={greeting}>Hi {customerName},</Text>

        <Text style={text}>
          Thank you for your order. This email confirms that we've received your
          request and it is now being processed.
        </Text>

        <Text style={sectionHeading}><strong>Order Details</strong></Text>
        <Text style={detailText}>Items: {SITE_NAME}</Text>
        <Text style={detailText}>Quantity: {quantity}</Text>
        <Text style={detailTextLast}>Status: Confirmed</Text>

        <Text style={totalText}><strong>Total: ${total}</strong></Text>
        <Text style={shippingNote}>Free shipping</Text>

        <Text style={text}>
          Please note: Your order will be shipped today or tomorrow depending on what time the order was placed, via standard mail with a stamp. We do not provide shipping confirmation, tracking numbers, or delivery confirmation. We hope it arrives in a timely manner.
        </Text>

        <Hr style={hr} />

        <Text style={footer}>
          Questions? Reply to this email or contact us at getdetach@gmail.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderNotificationInternalEmail,
  subject: 'Your Detach Order Confirmation',
  to: 'getdetach@gmail.com',
  displayName: 'Internal order confirmation',
  previewData: {
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    quantity: 1,
    total: '9.99',
    addressLines: '123 Main St, New York, NY 10001, US',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '40px 24px', maxWidth: '580px', margin: '0 auto' }
const greeting = { fontSize: '15px', color: '#222', margin: '0 0 16px', lineHeight: '1.6' }
const text = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const sectionHeading = { fontSize: '15px', color: '#222', margin: '0 0 6px', lineHeight: '1.6' }
const detailText = { fontSize: '15px', color: '#222', margin: '0', lineHeight: '1.6' }
const detailTextLast = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const totalText = { fontSize: '15px', color: '#222', margin: '0 0 4px', lineHeight: '1.6' }
const shippingNote = { fontSize: '14px', color: '#666', margin: '0 0 24px', lineHeight: '1.6' }
const hr = { borderColor: '#eee', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#999', margin: '0' }
