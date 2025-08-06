const ContactForm = () => {
  return (
    <form className="flex flex-col gap-4 w-full p-4">
      <div className="flex flex-col gap-0.5">
        <label className="text-(--primary-teal-dark)">Name (required)</label>
        <div className="flex flex-col min-[500px]:flex-row gap-4 w-full">
          <div className="flex flex-col gap-0.5 flex-1">
            <label className="text-(--primary-teal-dark)">First Name</label>
            <input
              type="text"
              className="border border-(--primary-teal-dark) p-2 rounded-lg"
              required
            />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <label className="text-(--primary-teal-dark)">Last Name</label>
            <input
              type="text"
              className="border border-(--primary-teal-dark) p-2 rounded-lg"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-(--primary-teal-dark)">Email (required)</label>
        <input
          type="email"
          className="border border-(--primary-teal-dark) p-2 rounded-lg"
          required
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-(--primary-teal-dark)">Number</label>
        <input
          type="phone"
          className="border border-(--primary-teal-dark) p-2 rounded-lg"
          required
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-(--primary-teal-dark)">Message (required)</label>
        <textarea
          className="border border-(--primary-teal-dark) p-2 rounded-lg"
          rows={4}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-(--primary-teal-dark) text-white p-2 rounded-lg hover:bg-(--primary-teal-dark-transparent) transition-colors duration-300 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
