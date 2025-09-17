# TODO: Implement Old Staking System

## ✅ Completed
- [x] Create TODO.md file to track progress

## 🔄 In Progress
- [ ] Phase 1: Core Hook Migration
  - [ ] Create `useBeeOsStakingOld.ts` hook
  - [ ] Update imports from ConnectKit to AppKit/Wagmi
  - [ ] Adapt API calls to current project structure
  - [ ] Update chain configuration

## 📋 Pending

### Phase 2: Component Migration
- [ ] Create StakingPageOld.tsx (preserve new as StakingPage.tsx)
- [ ] Create NFTListOld.tsx component
- [ ] Create NFTCardOld.tsx component  
- [ ] Create StakeModalOld.tsx component
- [ ] Create CollectionStatsOld.tsx component
- [ ] Create StakingStatsOld.tsx component

### Phase 3: Integration
- [ ] Update imports to use existing wallet provider
- [ ] Integrate with existing UI components
- [ ] Update styling to match current design system
- [ ] Connect to existing API client

### Phase 4: Testing & Cleanup
- [ ] Test wallet connection flow
- [ ] Test staking/unstaking functionality
- [ ] Verify XP calculations
- [ ] Clean up any errors

## 📝 Notes
- Preserving new implementation files without "Old" suffix
- Old implementation files will have "Old" suffix
- Using AppKit instead of ConnectKit for wallet connection
- Integrating with existing Wallet.provider.tsx and Wagmi.provider.tsx
