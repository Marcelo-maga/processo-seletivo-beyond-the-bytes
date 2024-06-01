import { AddressList } from "./_components/address-list";

export default function Home() {
  return (
    <main className="w-screen h-screen p-3 space-y-7 lg:flex  lg:justify-center ">
      <div className="lg:w-1/4">
        <AddressList />
      </div>
    </main>
  );
}
