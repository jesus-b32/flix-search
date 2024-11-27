import SettingCard from "@/components/SettingCard";

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center">
      <h1 className="my-5 text-4xl font-bold">Settings</h1>
      <div className="flex w-full flex-col md:items-center lg:w-11/12 lg:flex-row lg:items-start lg:gap-x-6">
        <div className="h-fit w-full items-start md:w-10/12 lg:w-60">
          <SettingCard />
        </div>
        <div className="flex w-full flex-col items-start gap-y-6 md:w-10/12 lg:w-3/4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
