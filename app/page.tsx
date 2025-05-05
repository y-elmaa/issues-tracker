import Image from "next/image";
import Link from "next/link";
import Pagination from "./components/Pagination";

export default async function Home(props:{searchParams:Promise<{page:string}>}) {
  const {page} = await props.searchParams
  return (
    <Pagination itemCount={100} currentPage={parseInt(page)} pageSize={10}/>
  );
}
