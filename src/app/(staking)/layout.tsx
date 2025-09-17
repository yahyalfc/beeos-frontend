export default function StakingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <SpeedInsights />

      <Toaster />
      <div>
        <HeaderGeneral /> */}
        {children}
        {/* <FooterGeneral />
      </div> */}
    </>
  );
}
