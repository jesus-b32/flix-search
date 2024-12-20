const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-6 flex h-screen items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
