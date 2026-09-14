# Use Official App Store Badges

## Goal
Replace the current homemade Apple and Android download icons with the official Apple App Store and Google Play badges. No user upload is needed.

## Changes
- Add the official English App Store and Google Play badge artwork from Apple and Google.
- Replace store download buttons in the homepage, app information page, FAQ, and footer with the matching official badge.
- Keep each existing store link and accessibility label unchanged.
- Size both badges consistently across desktop and mobile without changing the surrounding page design.
- Leave navigation links and ordinary text links as text where a full store badge would not fit naturally.

## Verification
- Check desktop and mobile layouts for equal badge sizing and no overlap.
- Confirm every badge opens the correct store listing.
- Run the existing build checks.

## Technical Details
The badge files will be stored through the project asset system and imported as local project assets, avoiding third-party image hotlinks.
