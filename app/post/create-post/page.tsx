import CreateForm from "@/components/CreateForm";

const page = () => {
  
  return (
    <div className="max-w-3xl mx-auto p-4 pt-32">
      <h2 className="heading">Create a New Post</h2>
      <p className="mt-2 mb-10 text-lg text-gray-600">Share your ideas with the world! Just add a title, write your post, and publish!</p>
      
      <CreateForm/>
    </div>
  );
};

export default page;
