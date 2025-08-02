import { Navigate } from 'react-router';

type PageProps = {
  isAdminUser: boolean;
};

export function Page({ isAdminUser }: PageProps) {
  // const registerForm = useRegisterForm();

  if (isAdminUser) return <Navigate to="/auth/login" />;

  return (
    <div className="h-screen flex items-center justify-center bg-[url(/login-page-bg.webp)] bg-cover bg-center">
      <div className="w-xl min-h-4/12 max-h-10/12 rounded-2xl shadow-xl shadow-gray-400 pt-4 px-4 pb-8 space-y-6 bg-white">
        <img
          src="/logo.png"
          alt="Mounting Medical logo"
          className="m-auto mb-4 w-[136px] h-[65px]"
        />

        <div className="text-center space-y-1 mb-4">
          <h1 className="text-2xl font-bold">Welcome to Mounting Medical</h1>
          <p className="text-sm text-muted-foreground">
            You’re about to create the first administrator account. This account will have full
            access to manage the system and staff. Please choose a strong password and keep your
            credentials safe.
          </p>
        </div>

        <div className="overflow-y-auto max-h-[300px] px-2">
          {/* <RegisterForm {...registerForm} /> */}
        </div>

        {/* <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-3">
          {registerForm.step > 0 && (
            <Button variant="secondary" className="w-full" onClick={registerForm.handlePrev}>
              Prev
            </Button>
          )}

          {registerForm.step === Object.keys(registerForm.forms).length ? (
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => registerForm.handleSubmit()}
            >
              Submit
            </Button>
          ) : (
            <Button variant="secondary" className="w-full" onClick={registerForm.handleNext}>
              Next
            </Button>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Page;
