# TODO: Fix useBeeOsStakingOld.ts Implementation

## Tasks to Complete

- [x] Analyze current implementation issues
- [x] Review API documentation and existing services
- [x] Update useBeeOsStakingOld.ts to use Alchemy API service
  - [x] Replace marketplace API calls with Alchemy service
  - [x] Update lock/unlock API endpoints to new NestJS endpoints
  - [x] Use proper API base URL configuration
  - [x] Import necessary types and services
  - [x] Fix NFT metadata fetching logic
- [ ] Test the implementation
- [ ] Verify all endpoints work correctly

## Changes Made

### useBeeOsStakingOld.ts
- Replacing `/marketplace/token/` endpoints with Alchemy API service
- Updating API endpoints from old to new:
  - `/api/lock-beeos` → `/nft-staking/lock`
  - `/api/unlock-beeos` → `/nft-staking/unlock`
  - `/api/get-locked` → proper backend endpoint
  - `/api/get-unlocked` → `/nft-staking/unlocked`
- Using AlchemyService for NFT metadata fetching
- Proper error handling and type safety
