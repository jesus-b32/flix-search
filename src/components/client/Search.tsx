"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

/**
 * This form schema ensures that the search term is not empty and media type fields is either movies or tv-shows
 *
 * @returns a form schema that ensures that the search term is not empty and media type fields is either movies or tv-shows
 */
const formSchema = z.object({
  searchTerm: z.string().min(1, {
    message: "Search term is required",
  }),
  mediaType: z.enum(["movie", "tv-show"], {
    required_error: "You need to select a type",
  }),
});

interface SearchProps {
  onSearch?: () => void;
}

/**
 * A form to search for movies and TV shows.
 * Used in the home page.
 *
 * The form is validated using the `formSchema` defined above. The search term
 * must not be empty, and the media type must be either "movie" or "tv-show".
 *
 * When the form is submitted, the current URL is replaced with a new URL that
 * includes the search term in the query string. The path of the
 * new URL is determined by the media type.
 *
 * @param onSearch - the function to call when the search is submitted
 * @returns a search component that displays the search form
 */
export default function Search({ onSearch }: SearchProps) {
  const router = useRouter();

  // `useForm` hook from react-hook-form to manage the form state and validation.
  // https://react-hook-form.com/api/useform
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: "",
      mediaType: "movie",
    },
  });

  /**
   * Used to submit the Search form.
   * Used to create a url friendly search params and redirect to the search results page.
   * Used to call the onSearch callback if provided.
   *
   * @param values - the values of the Search form
   */
  function onSubmit(values: z.infer<typeof formSchema>) {
    const searchTerm = values.searchTerm;
    const mediaType = values.mediaType;

    //create a url friendly search params
    const params = new URLSearchParams();
    params.set("search", searchTerm);

    if (mediaType === "movie") {
      router.push(`/search/movie/?${params.toString()}`);
    } else if (mediaType === "tv-show") {
      router.push(`/search/tv/?${params.toString()}`);
    }

    // Call the onSearch callback if provided
    onSearch?.();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-5 max-w-md space-y-3"
      >
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl aria-label="Search term">
                  <Input
                    placeholder="Search movies & shows"
                    {...field}
                    className="text-foreground"
                    aria-label="Search term"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" aria-label="Search">
            <SearchIcon size={20} />
          </Button>
        </div>
        <FormField
          control={form.control}
          name="mediaType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl aria-label="Select media type">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex justify-center space-x-4"
                  aria-label="Select media type"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl aria-label="Select movie">
                      <RadioGroupItem
                        value="movie"
                        className="border-foreground text-foreground"
                        aria-label="Movie"
                      />
                    </FormControl>
                    <span>Movie</span>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl aria-label="Select TV show">
                      <RadioGroupItem
                        value="tv-show"
                        className="border-foreground text-foreground"
                        aria-label="TV show"
                      />
                    </FormControl>
                    <span>Show</span>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
