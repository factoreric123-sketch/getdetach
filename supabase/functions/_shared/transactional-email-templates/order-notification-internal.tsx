import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface OrderNotificationInternalProps {
  customerName?: string
  customerEmail?: string
  quantity?: number
  total?: string
  addressLines?: string
  sessionId?: string
}

const OrderNotificationInternalEmail = ({
  customerName = 'N/A',
  customerEmail = 'N/A',
  quantity = 1,
  total = '9.99',
  addressLines = 'N/A',
  sessionId = 'N/A',
}: OrderNotificationInternalProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New Detach order from {customerName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Order Received</Heading>

        <Text style={sectionHeading}><strong>Customer</strong></Text>
        <Text style={detailText}>Name: {customerName}</Text>
        <Text style={detailTextLast}>Email: {customerEmail}</Text>

        <Text style={sectionHeading}><strong>Order</strong></Text>
        <Text style={detailText}>Quantity: {quantity}</Text>
        <Text style={detailTextLast}>Total: ${total}</Text>

        <Text style={sectionHeading}><strong>Shipping Address</strong></Text>
        <Text style={detailTextLast}>{addressLines}</Text>

        <Hr style={hr} />

        <Text style={footer}>Stripe session: {sessionId}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderNotificationInternalEmail,
  subject: 'New Detach Order',
  to: 'getdetach@gmail.com',
  displayName: 'Internal order notification',
  previewData: {
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    quantity: 1,
    total: '9.99',
    addressLines: '123 Main St, New York, NY 10001, US',
    sessionId: 'cs_test_123',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '40px 24px', maxWidth: '580px', margin: '0 auto' }
const h1 = { fontSize: '20px', color: '#222', margin: '0 0 24px', lineHeight: '1.4' }
const sectionHeading = { fontSize: '15px', color: '#222', margin: '0 0 6px', lineHeight: '1.6' }
const detailText = { fontSize: '15px', color: '#222', margin: '0', lineHeight: '1.6' }
const detailTextLast = { fontSize: '15px', color: '#222', margin: '0 0 24px', lineHeight: '1.6' }
const hr = { borderColor: '#eee', margin: '24px 0' }
const footer = { fontSize: '13px', color: '#999', margin: '0' }
