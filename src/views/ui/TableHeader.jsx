function TableHeader({name,count}) {
  return (
    <>
      <section className='title__timesheet'>
        <h5 className='fs-1'>{name}</h5>
        <h5>Attendances: {count}</h5>
      </section>
    </>
  );
}

export default TableHeader;
