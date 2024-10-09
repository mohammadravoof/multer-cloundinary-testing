import { Input } from '@/components/ui/input';
import { uploadImage } from './lib/apiService';
import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from './components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
    image: z.instanceof(globalThis.File),
});

const App = () => {
    const [link, setLink] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: undefined,
        },
    });
    const getlink = async ({ image }: { image: globalThis.File }) => {
        setLoading(true);
        try {
            const link = await uploadImage({ image });
            setLink(link.url);
        } catch (error) {
            console.error('Error uploading the image:', error);
        }
    };

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        getlink(values);
        console.log(values);
    }
    return (
        <div className="flex flex-col gap-10 h-screen w-screen justify-center items-center ">
            <Form {...form}>
                <form
                    encType="multipart/form-data"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 w-2/5 border rounded-lg p-6 "
                >
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Picture</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Name of the Book"
                                        className="w-full"
                                        id="picture"
                                        type="file"
                                        onChange={(e) => {
                                            const files = e.target.files;
                                            if (files && files.length > 0) {
                                                // Set the first selected file to the field value
                                                field.onChange(files[0]); // or use a state setter function to store the file
                                            }
                                        }}
                                        onBlur={field.onBlur}
                                        name={field.name} // Include the name explicitly
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Upload</Button>
                </form>
            </Form>

            {loading && <Skeleton className="w-[200px] h-[250px] rounded-sm" />}

            {link ? (
                <div className="flex justify-center rounded-md  h-auto w-1/5">
                    <img
                        src={link}
                        className="border rounded-md w-fit max-w-full h-auto"
                        alt="book cover"
                        onLoad={() => setLoading(false)}
                    />
                </div>
            ) : null}
        </div>
    );
};

export default App;
