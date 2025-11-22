import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/modified/carousel";
import type {
  AnswersOtherType,
  AnswersPetType,
  AnswersType,
  AnswersUserType,
} from "@/lib/types";
import InfoFormPetInfo from "../components/forms/sections/InfoFormPetInfo";
import InfoFormBanner from "@/components/forms/InfoFormBanner";
import { useEffect, useState } from "react";
import { PIPA_PET_KEY } from "@/lib/constants";
import { petAges } from "@/data/petAges";
import InfoFormUserInfo from "@/components/forms/sections/InfoFormUserInfo";
import InfoFormAdditionalInfo from "@/components/forms/sections/InfoFormAdditionalInfo";
import { formSubmitted } from "@/api/api";
import { registerPetFormCompleted } from "@/features/analytics/emitters";
import { useNavigate } from "react-router-dom";

const defaultPetAnswers: AnswersPetType = {
  petName: "",
  animal: "",
  gender: "",
  age: { value: 0, label: "" },
  weight: "",
  breed: "",
};

const defaultUserAnswers: AnswersUserType = {
  name: { firstName: "", lastName: "" },
  email: "",
  zip: "",
};

const defaultOtherAnswers: AnswersOtherType = {
  reference: "",
};

const defaultAnswers: AnswersType = {
  ...defaultPetAnswers,
  ...defaultUserAnswers,
  ...defaultOtherAnswers,
};

function InfoForm() {
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);
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

  const handleSubmitUserInfo = (data: AnswersUserType) => {
    const updatedAnswers = {
      ...answers,
      ...data,
    };
    localStorage.setItem(PIPA_PET_KEY, JSON.stringify(updatedAnswers));
    setAnswers(updatedAnswers);
  };

  const handleSubmitAdditionalInfo = (data: AnswersOtherType) => {
    console.log("Additional Info Submitted:", data);
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

  useEffect(() => {
    // Check all of the answer to make sure every property has a value
    let valid = true;
    if (
      !answers.petName ||
      answers.petName === "" ||
      !answers.animal ||
      !answers.gender ||
      !answers.age ||
      answers.age.value === 0 ||
      !answers.weight ||
      answers.weight === "" ||
      !answers.breed ||
      answers.breed === "" ||
      !answers.name ||
      answers.name.firstName === "" ||
      !answers.name ||
      answers.name.lastName === "" ||
      !answers.email ||
      answers.email === "" ||
      !answers.zip ||
      answers.zip === ""
      // ||
      // !answers.reference ||
      // answers.reference === ""
    )
      valid = false;
    setFormValid(valid);
  }, [answers]);

  useEffect(() => {
    console.log("Form valid state:", formValid);
  }, [formValid]);

  return (
    <main className="bg-(--light-pink) w-full p-8">
      <InfoFormBanner />

      <Carousel className="w-full mx-auto my-8">
              {/* <CarouselPrevious />
        <CarouselNext /> */}

        <CarouselContent className="">
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-start justify-center p-6">
                  <InfoFormPetInfo
                    onSubmit={(data: {
                      petName: string;
                      animal: "dog" | "cat";
                      gender: "male" | "female";
                      weight: number;
                      age: number;
                      breed: string;
                    }) => {
                      const mapped: AnswersPetType = {
                        petName: data.petName,
                        animal: data.animal,
                        gender: data.gender,
                        age: petAges.find((a) => a.value === data.age) ?? {
                          value: 0,
                          label: "",
                        },
                        weight: String(data.weight),
                        breed: data.breed,
                      };
                      handleSubmitPetInfo(mapped);
                    }}
                    answers={answers}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="">
            <div className="p-1">
              <Card className="">
                <CardContent className="flex items-start justify-center p-6 ">
                  <InfoFormUserInfo
                    onSubmit={(data: {
                      firstName: string;
                      lastName: string;
                      email: string;
                      zip: string;
                    }) => {
                      const mapped: AnswersUserType = {
                        name: {
                          firstName: data.firstName,
                          lastName: data.lastName,
                        },
                        email: data.email,
                        zip: data.zip,
                      };
                      handleSubmitUserInfo(mapped);
                    }}
                    answers={answers}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="">
            <div className="p-1">
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
                    formValid={formValid}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </main>
  );
}

export default InfoForm;
