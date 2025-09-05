import FormInput from "../components/FormInput";
import FormTextArea from "../components/FormTextArea";
import { useCollection } from "../hooks/useCollection";
import Select from "react-select";
import { useEffect, useState } from "react";

function CreateTask() {
  const { data } = useCollection("users");
  const [userOptions, setUserOptions] = useState([]);

  useEffect(() => {
    const users = data?.map((user) => {
      return {
        value: user.displayName,
        label: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      };
    });
    setUserOptions(users || []);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(userOptions);

  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <FormInput label="title" name="title" type="text" />
        <FormTextArea label="Description:" />
        <FormInput label="Due To" name="due-to" type="date" />
        <Select
          isMulti
          name="Users"
          options={userOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-8 h-8 rounded-full border border-gray-200">
                  <img
                    src={
                      option.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        option.label || "User"
                      )}&background=random`
                    }
                    alt={option.label}
                  />
                </div>
              </div>
              <span className="text-gray-700">{option.label}</span>
            </div>
          )}
        />
        <button className="btn btn-primary">Create</button>
      </form>
    </>
  );
}

export default CreateTask;
