interface CardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    btn: string;
}

function Card({ icon, title, desc, btn }: CardProps) {
    return (
        <div className="relative px-6 py-8 h-full">
            <img
                className="absolute inset-0 w-full h-full"
                src="/profile-stats-bg-card.png"
                alt=""
            />
            <div className="relative z-[2] flex flex-col gap-2 h-full">
                {icon}
                <h4 className="text-lg font-medium text-white">{title}</h4>
                <p className="text-mini text-slight">{desc}</p>
                <button className="mt-auto text-accent text-sm font-medium hover:underline text-left">
                    {btn}
                </button>
            </div>
        </div>
    );
}
export default Card;