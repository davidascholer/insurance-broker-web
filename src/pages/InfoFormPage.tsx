import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselCustomNextButton,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/modified/carousel";
import type {
  AgeType,
  AnswersOtherType,
  AnswersPetType,
  AnswersType,
  AnswersUserType,
} from "@/lib/types";
import InfoFormPetInfo from "../components/forms/sections/InfoFormPetInfo";
import InfoFormBanner from "@/components/forms/InfoFormBanner";
import { useState, useRef } from "react";
import { PIPA_PET_KEY } from "@/lib/constants";
import { petAges } from "@/data/petAges";
import InfoFormUserInfo from "@/components/forms/sections/InfoFormUserInfo";
// import InfoFormAdditionalInfo from "@/components/forms/sections/InfoFormAdditionalInfo";
import { formSubmitted } from "@/api/api";
import { registerPetFormCompleted } from "@/features/analytics/emitters";
import { Link, useNavigate } from "react-router-dom";

const defaultPetAnswers: AnswersPetType = {
  petName: "",
  animal: "",
  gender: "",
  age: { value: 0, label: "" },
  weight: "",
  breed: "",
};

const defaultUserAnswers: AnswersUserType & AnswersOtherType = {
  name: { firstName: "", lastName: "" },
  email: "",
  zip: "",
  reference: "",
};

const defaultAnswers: AnswersType = {
  ...defaultPetAnswers,
  ...defaultUserAnswers,
};

function InfoFormPage() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null!);
  const [petFormValid, setPetFormValid] = useState(false);
  const [userFormValid, setUserFormValid] = useState(false);
  const [answers, setAnswers] = useState<AnswersType>(() => {
    const savedAnswers = localStorage.getItem(PIPA_PET_KEY);
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers) as AnswersType;
      return parsedAnswers;
    } else {
      return defaultAnswers;
    }
  });

  // useEffect(() => {
  //   // Check for ?edit=question in URL to edit a specific question
  //   // const queryParams = new URLSearchParams(location.search);
  //   // const edit = queryParams.get("edit");
  //   // if (!edit) navigate("/quotes");
  // }, []);

  const handleSubmitPetInfo = (data: AnswersPetType) => {
    // Handle pet name submission logic here
    const petAge = petAges.find((age) => age.value === data.age.value);
    const updatedAnswers = {
      ...answers,
      ...data,
      age: petAge ? petAge : { value: 0, label: "" },
    };
    localStorage.setItem(PIPA_PET_KEY, JSON.stringify(updatedAnswers));
    setAnswers(updatedAnswers);
  };

  const handleSubmitUserInfo = (data: AnswersUserType & AnswersOtherType) => {
    const updatedAnswers = {
      ...answers,
      ...data,
    };
    localStorage.setItem(PIPA_PET_KEY, JSON.stringify(updatedAnswers));
    setAnswers(updatedAnswers);

    formSubmitted(updatedAnswers);
    registerPetFormCompleted({ petObject: updatedAnswers });
    navigate("/quotes");
  };

  // const handleSubmitAdditionalInfo = (data: AnswersOtherType) => {
  //   const updatedAnswers = {
  //     ...answers,
  //     ...data,
  //   };
  //   localStorage.setItem(PIPA_PET_KEY, JSON.stringify(updatedAnswers));
  //   setAnswers(updatedAnswers);

  //   formSubmitted(updatedAnswers);
    // registerPetFormCompleted({ petObject: updatedAnswers });
  //   navigate("/quotes");
  // };

  return (
    <main className="bg-(--light-pink) w-full p-8 overflow-y-scroll no-scrollbar pt-28">
      <header
        className="bg-(--light-pink) dark:bg-(--primary-teal-dark) fixed top-0 left-0 right-0 z-100 h-24 shadow-md text-center flex items-center justify-center"
        role="banner"
        aria-label="Main navigation header"
      >
        <div className="flex max-w-5xl h-full px-4 items-center w-full justify-start gap-8 xl:text-lg">
          <Link
            to="/"
            className="sansita-regular cursor-pointer w-32"
            aria-label="Go to Pipa Broker homepage"
          >
            <img
              src="/logo.png"
              alt="PIPA Broker logo - Pet insurance made simple"
              className="max-h-20"
            />
          </Link>
        </div>
      </header>
      <InfoFormBanner />
      <Carousel className="w-full mx-auto my-8 flex flex-col items-center" ref={scrollRef}>
        <CarouselDots className="max-w-4xl" items={2} />
        <CarouselContent className="min-w-[300px] max-w-screen">
          <CarouselItem>
            <div className="p-1 mx-auto w-full max-w-4xl">
              <Card>
                <CardContent className="flex items-start justify-center p-6">
                  <InfoFormPetInfo
                    submitButton={
                      <CarouselCustomNextButton
                        type="submit"
                        disabled={!petFormValid}
                        className="cursor-pointer mx-auto w-full max-w-xl text-lg sansita-regular py-6 px-4"
                        scrollRef={scrollRef}
                      >
                        Continue
                      </CarouselCustomNextButton>
                    }
                    onSubmit={(data: {
                      petName: string;
                      animal: "dog" | "cat";
                      gender: "male" | "female";
                      weight: number;
                      age: AgeType;
                      breed: string;
                    }) => {
                      const mapped: AnswersPetType = {
                        petName: data.petName,
                        animal: data.animal,
                        gender: data.gender,
                        age: petAges.find(
                          (a) => a.value === data.age.value
                        ) ?? {
                          value: 0,
                          label: "",
                        },
                        weight: String(data.weight),
                        breed: data.breed,
                      };
                      handleSubmitPetInfo(mapped);
                    }}
                    answers={answers}
                    setPetFormValid={setPetFormValid}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="">
            <div className="p-1 mx-auto w-full max-w-4xl">
              <Card className="">
                <CardContent className="flex items-start justify-center p-6 ">
                  <InfoFormUserInfo
                    onSubmit={(data: {
                      firstName: string;
                      lastName: string;
                      email: string;
                      zip: string;
                      reference?: string;
                    }) => {
                      const mapped: AnswersUserType & AnswersOtherType = {
                        name: {
                          firstName: data.firstName,
                          lastName: data.lastName,
                        },
                        email: data.email,
                        zip: data.zip,
                        reference: data.reference || "",
                      };
                      handleSubmitUserInfo(mapped);
                    }}
                    answers={answers}
                    setUserFormValid={setUserFormValid}
                    isValid={petFormValid && userFormValid}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          {/* <CarouselItem className="">
            <div className="p-1 mx-auto w-full max-w-4xl">
              <Card className="">
                <CardContent className="flex items-start justify-center p-6 ">
                  <InfoFormAdditionalInfo
                    onSubmit={(data: { reference: string }) => {
                      const mapped: AnswersOtherType = {
                        reference: data.reference,
                      };
                      handleSubmitAdditionalInfo(mapped);
                    }}
                    answers={answers}
                    formValid={petFormValid && userFormValid}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem> */}
        </CarouselContent>
      </Carousel>
    </main>
  );
}

export default InfoFormPage;
