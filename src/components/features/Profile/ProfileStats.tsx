"use client";

import { type FC } from "react";

import { Lock, Rocket, Target, Bot } from "lucide-react";

import { ProfileXPInterface } from "@/components/shared/Interfaces/VectorInterfaces/ProfileXPInterface";

export const ProfileStats: FC = () => {
  return (
    <div className="flex flex-col gap-4 prnt_most">
      <h2 className="text-2xl uppercase font-tusker-exp font-medium text-white">
        Earn More Bee Points:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 card_prnt">
        <div className="relative px-6 py-8">
          <img className="bgcard" src="\firstcard.png" alt="" />
          <div className="relative z-[2] flex flex-col gap-2">
            <Lock className="w-8 h-8 text-accent" />
            <h4 className="text-lg font-medium text-white">NFT Staking</h4>
            <p className="text-mini text-slight">
              Lock your BeeOS NFTs to earn passive rewards and boost your
              earning potential in the ecosystem.
            </p>
            <button className="mt-auto text-accent text-sm font-medium hover:underline text-left">
              Stake now
            </button>
          </div>
        </div>

        <div className="relative px-6 py-8">
          <img className="bgcard" src="\middlecard.png" alt="" />
          <div className="relative z-[2] flex flex-col gap-2">
            <Rocket className="w-8 h-8 text-accent" />
            <h4 className="text-lg font-medium text-white">
              Mint on Launchpad
            </h4>
            <p className="text-mini text-slight">
              Get early access to premium NFT collections and earn bonus points
              for each successful mint.
            </p>
            <button className="mt-auto text-accent text-sm font-medium hover:underline text-left">
              Explore mints
            </button>
          </div>
        </div>

        <div className="relative px-6 py-8">
          <img className="bgcard" src="\rightcard.png" alt="" />
          <div className="relative z-[2] flex flex-col gap-2">
            <Target className="w-8 h-8 text-accent" />
            <h4 className="text-lg font-medium text-white">
              Community Raffles
            </h4>
            <p className="text-mini text-slight">
              Participate in Discord events and win exclusive prizes including
              rare NFTs and bonus points.
            </p>
            <button className="mt-auto text-accent text-sm font-medium hover:underline text-left">
              Join Discord
            </button>
          </div>
        </div>

        {/* <div className="relative px-6 py-8">
          <ProfileXPInterface />
          <div className="relative z-[2] flex flex-col gap-2">
            <Bot className="w-8 h-8 text-slight" />
            <h4 className="text-lg font-medium text-white">AI Agent</h4>
            <p className="text-mini text-slight">
              Coming soon! Earn Bee Points for every credit used in our advanced
              AI trading and analytics agent.
            </p>
            <button className="mt-auto text-slight text-sm font-medium cursor-not-allowed text-left">
              Coming Soon
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};
