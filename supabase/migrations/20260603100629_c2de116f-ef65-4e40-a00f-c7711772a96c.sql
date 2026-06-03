CREATE POLICY "email_assets service role insert"
ON storage.objects FOR INSERT TO service_role
WITH CHECK (bucket_id = 'email-assets');

CREATE POLICY "email_assets service role update"
ON storage.objects FOR UPDATE TO service_role
USING (bucket_id = 'email-assets')
WITH CHECK (bucket_id = 'email-assets');

CREATE POLICY "email_assets service role delete"
ON storage.objects FOR DELETE TO service_role
USING (bucket_id = 'email-assets');