import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as BlogApi from "@/network/api/blog";
import FormInputField from "@/components/form/FormInputField";
import MarkdownEditor from "@/components/form/MarkdownEditor";
import { generateSlug } from "@/utils/utils";
import LoadingButton from "@/components/LoadingButton";

interface CreatePostFormData {
  slug: string;
  title: string;
  summary: string;
  body: string;
  featuredImage: FileList;
}

export default function CreateBlogPostPage() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>();

  async function onSubmit({
    title,
    slug,
    summary,
    featuredImage,
    body,
  }: CreatePostFormData) {
    try {
      await BlogApi.createBlogPost({
        title,
        slug,
        summary,
        featuredImage: featuredImage[0],
        body,
      });
      alert("Post created successfully");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  function generatedSlugFromTitle() {
    if (getValues("slug")) return;
    const slug = generateSlug(getValues("title"));
    setValue("slug", slug, { shouldValidate: true });
  }

  return (
    <div>
      <h1>Create a post</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInputField
          register={register("title", { required: "Required" })}
          label="Post title"
          placeholder="Post title"
          maxLength={100}
          error={errors.title}
          onBlur={generatedSlugFromTitle}
        />
        <FormInputField
          register={register("slug", { required: "Required" })}
          label="Slug"
          placeholder="Post slug"
          maxLength={100}
          error={errors.slug}
        />
        <FormInputField
          register={register("summary", { required: "Required" })}
          label="Summary"
          placeholder="Post summary"
          maxLength={300}
          error={errors.summary}
          as="textarea"
        />
        <FormInputField
          label="Post image"
          register={register("featuredImage", { required: "Required" })}
          type="file"
          accept="image/png,image/jpeg"
          error={errors.featuredImage}
        />
        <MarkdownEditor
          label="Post body"
          register={register("body", { required: "Required" })}
          watch={watch}
          setValue={setValue}
          error={errors.body}
        />
        <LoadingButton type="submit" isLoading={isSubmitting}>
          Create a post
        </LoadingButton>
      </Form>
    </div>
  );
}
