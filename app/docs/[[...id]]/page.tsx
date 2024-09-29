type DocsParams = {
  params: {
    id: string[]
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const DocsPage = ({ params, searchParams }: DocsParams) => {
  return (
    <div>
      Docs: {params?.id?.join(', ')}
      <br />
      <div>{searchParams.thing}</div>
    </div>
  )
}

export default DocsPage
