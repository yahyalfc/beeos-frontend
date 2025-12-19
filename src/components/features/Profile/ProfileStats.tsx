"use client";

import { type FC } from "react";

import { Lock, Rocket, Target, Bot } from "lucide-react";

import { ProfileXPInterface } from "@/components/shared/Interfaces/VectorInterfaces/ProfileXPInterface";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Card from "./Card";
export const ProfileStats: FC = () => {
  return (
    <div className="flex flex-col gap-4 prnt_most">
      {/* HEADER */}
      <div className="top_header flex justify-between items-center">
        <h2 className="text-2xl uppercase font-medium text-white">
          Earn More Bee Points:
        </h2>

        {/* THESE BUTTONS CONTROL SWIPER */}
        {/* <div className="buttonheader_card flex gap-2">
          <button className="swiper-prev">
            <img src="/prev_btn.svg" alt="prev" />
          </button>
          <button className="swiper-next">
            <img src="/next_btn.svg" alt="next" />
          </button>
        </div> */}
      </div>

      {/* SLIDER */}
      {/* <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-prev",
          nextEl: ".swiper-next",
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="card_prnt"
      > */}
      {/* <SwiperSlide> */}
      <div className="prnt_top_grid">
        <Card
          icon={<Lock className="w-8 h-8 text-accent" />}
          title="NFT Staking"
          desc="Lock your BeeOS NFTs to earn passive rewards."
          btn="Stake now"
        />
        <Card
          icon={<Rocket className="w-8 h-8 text-accent" />}
          title="Mint on Launchpad"
          desc="Get early access to premium NFT collections."
          btn="Explore mints"
        />
        <Card
          icon={<Target className="w-8 h-8 text-accent" />}
          title="Community Raffles"
          desc="Participate in Discord events and win prizes."
          btn="Join Discord"
        />
      </div>
      <div className="grid_template_sec">


        <Card
          icon={<Target className="w-8 h-8 text-accent" />}
          title="Stake BeeOS NFT"
          desc="Yes, this is the official release. All items and details have been verified by our team to ensure authenticity and quality. "
          btn="Community Raffles"
        />
        <Card
          icon={<Target className="w-8 h-8 text-accent" />}
          title="Mint NFT on Launchpad"
          desc="Yes, this is the official release. All items and details have been verified by our team to ensure authenticity and quality. "
          btn="Community Raffles"
        />
      </div>
      {/* <Card
        icon={<Lock className="w-8 h-8 text-accent" />}
        title="NFT Staking"
        desc="Lock your BeeOS NFTs to earn passive rewards."
        btn="Stake now"
      />
      </SwiperSlide>

        <SwiperSlide>
      <Card
        icon={<Rocket className="w-8 h-8 text-accent" />}
        title="Mint on Launchpad"
        desc="Get early access to premium NFT collections."
        btn="Explore mints"
      />
      </SwiperSlide>

        <SwiperSlide>
      <Card
        icon={<Target className="w-8 h-8 text-accent" />}
        title="Community Raffles"
        desc="Participate in Discord events and win prizes."
        btn="Join Discord"
      />
      </SwiperSlide>
        <SwiperSlide>
      <Card
        icon={<Target className="w-8 h-8 text-accent" />}
        title="Community Raffles"
        desc="Participate in Discord events and win prizes."
        btn="Join Discord"
      />
      </SwiperSlide>
        <SwiperSlide>
      <Card
        icon={<Target className="w-8 h-8 text-accent" />}
        title="Community Raffles"
        desc="Participate in Discord events and win prizes."
        btn="Join Discord"
      />
      </SwiperSlide>
      <SwiperSlide>
      <Card
        icon={<Target className="w-8 h-8 text-accent" />}
        title="Community Raffles"
        desc="Participate in Discord events and win prizes."
        btn="Join Discord"
      />
      </SwiperSlide>
       </Swiper>  */}
    </div>
  );
};
