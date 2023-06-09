import { useState } from "react";
import Input from "@components/ui/form/input";
import PasswordInput from "@components/ui/form/password-input";
import { useForm, Controller } from "react-hook-form";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import Image from "@components/ui/image";
import { useModalAction } from "@components/common/modal/modal.context";
import CloseButton from "@components/ui/close-button";
import cn from "classnames";
import PhoneInputWithCountry from "@components/ui/form/phone-input";

const SignUpForm = ({ isPopup = true, className }) => {
  const { closeModal, openModal } = useModalAction();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  function handleSignIn() {
    return openModal("LOGIN_VIEW");
  }

  async function onSubmit({ name, email, mobile, password }) {
    setProcessing(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("mobile", mobile);

    formData.append("userType", "Customer");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setProcessing(false);
        handleSignIn();
      }
    } catch (error) {
      console.log(error.message);
      setProcessing(false);
      setError(error?.message);
    }
  }

  return (
    <div
      className={cn(
        "flex bg-fill mx-auto rounded-lg w-full lg:w-[1000px] 2xl:w-[1200px]",
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex bg-fill mx-auto rounded-lg overflow-hidden w-full">
        <div className="md:w-[55%] xl:w-[60%] hidden md:block relative ">
          <Image
            src="/images/hero/registration.png"
            alt="sign up"
            layout="fill"
            // width={800}
            // height={620}
            // objectFit="contain"
            className="w-full"
          />
        </div>
        <div className="w-full md:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 lg:px-12  rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>

            <div className="text-sm sm:text-base text-body text-center mt-3 mb-1">
              Are you already registered ?
              <button
                type="button"
                className="ml-1 text-[16px] text-primary font-medium hover:no-underline focus:outline-none"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label="Name"
                type="text"
                placeholder="Enter your name !"
                variant="outline"
                {...register("name", {
                  required: "forms:name-required",
                })}
                error={errors.name?.message}
              />

              <PhoneInputWithCountry
                name="mobile"
                control={control}
                rules={{ required: true }}
                defaultCountry="IN"
                placeholder="XXXXXXXXXX"
              />
              <Input
                label="Email"
                type="email"
                variant="outline"
                placeholder="Enter your email !"
                {...register("email", {
                  required: "Email is mandatory !",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "wrong email format !",
                  },
                })}
                error={errors.email?.message}
              />
              <PasswordInput
                placeholder="Enter your password !"
                label="Password"
                variant="outline"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is mandatory !",
                })}
              />

              <div className="relative">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full font-nunito px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-primary rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90"
                >
                  {processing ? "Registering ... " : "Register"}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <Alert
              message={error}
              variant="error"
              closeable={true}
              className="mt-5"
              onClose={() => setError(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
