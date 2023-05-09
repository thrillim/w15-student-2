import Table from "./components/table/page"
import CreateButton from './components/createButton/page'

export default function Home() {
  return (
    <main className='bg-secondary lg:min-h-screen lg:min-w-screen
      md:min-h-screen md:w-full sm:min-h-screen sm:width-full p-[1em]'>
      <CreateButton id={''} />
      <Table />
    </main>
  )
}