import { Spinner } from "@/components/ui/Flowbite";

export default function Loading() {
  return <div className="h-screen flex justify-center items-center">
    <div className="text-center">
      <span className="mr-3 text-lg">loading...</span>
      <Spinner size="xl" aria-label="Center-aligned spinner example" />
    </div>
  </div>
}