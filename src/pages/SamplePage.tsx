import PageContainer from "@/components/PageContainer";

export default function SamplePage() {
  return (
    <PageContainer>
      <h1 className="sansita-regular text-(--primary-teal-dark) font-bold text-2xl mt-[10px]">
        Sample heading with centered text
      </h1>
      <div className="w-full rounded-xl p-[16px] sansita-regular text-(--primary-teal-dark) bg-white">
        <h2>
          Sample p element w heading with some font specific styles inside of a styled
          div.
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </PageContainer>
  );
}
