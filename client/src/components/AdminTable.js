import BootstrapTable from "react-bootstrap/Table";

const AdminTable = (props) => {
 const theaders = props.data.theaders;
 const tdata = props.data.tdata;
 console.log(tdata);
  return (
    <>
      { theaders !== undefined ? (
        <>
        <h2>{props.title}</h2>
          <BootstrapTable bordered striped>
            <thead>
              <tr>
                {theaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tdata.map((row) => (
                <tr key = {row._id}>
                  {Object.values(row).map((td, i) => (
                    <td key={row._id + i}>{JSON.stringify(td)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </BootstrapTable>
        </>
      ) : (
        "Data Loading"
      )}
    </>
  );
};

export default AdminTable;
