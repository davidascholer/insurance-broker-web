import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
  const [answers, setAnswers] = useState<AnswersType>(() => {
    const savedAnswers = localStorage.getItem(PIPA_PET_KEY);
    if (savedAnswers) {
      const parsedAnswers = JSON.parse(savedAnswers) as AnswersType;
      return parsedAnswers;
    } else {
      return defaultAnswers;
    }
  });

  useEffect(() => {
    // Check for ?edit=question in URL to edit a specific question
    const queryParams = new URLSearchParams(location.search);
    const edit = queryParams.get("edit");
    // if (!edit) navigate("/quotes");
  }, []);

  const handleSubmit = () => {
    // Handle pet name submission logic here
  };

  return (
    <main className="bg-(--light-pink) w-full p-8">
      <InfoFormBanner />

      <Carousel className="w-full max-w-3/4 mx-auto my-8">
        <CarouselContent className="">
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-start justify-center p-6">
                  <InfoFormPetInfo onSubmit={handleSubmit} answers={answers} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem className="">
            <div className="p-1">
              <Card className="">
                <CardContent className="flex items-start justify-center p-6 ">
                  <span className="text-4xl font-semibold">{2}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-start justify-center p-6 ">
                  <span className="text-4xl font-semibold">{3}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}

export default InfoForm;
