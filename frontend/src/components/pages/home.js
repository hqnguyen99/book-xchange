import React from 'react'
import { useTable, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table'
import styled from 'styled-components'

const Styles = styled.div`
 table {
   border-spacing: 0;
   border: 1px solid black;

   tr {
     :last-child {
       td {
         border-bottom: 0;
       }
     }
   }

   th,
   td {
     padding: 0.5rem;
     border-bottom: 1px solid black;
     border-right: 1px solid black;

     :last-child {
       border-right: 0;
     }
   }
  
   th {
     background: orange;
     border-bottom: 2px solid black;
     color: white;
     fontWeight: bold;
   }
 }
`

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function submitClick(value) {
    console.log(value);
    //write the further functionality
}

function Table({ columns, data, getRowProps = () => ({}) }) {
    const { getTableProps, headerGroups, rows, prepareRow, state, preGlobalFilteredRows, setGlobalFilter, } =
        useTable(
            {
                columns,
                data,
            },
            useGlobalFilter,
            useSortBy,
        )

    return (
        <>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {rows.map(
                        (row, i) =>
                            prepareRow(row) || (
                                <tr {...row.getRowProps(getRowProps(row))}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            )
                    )}
                </tbody>
            </table>
        </>
    )
}

export default function Home() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'User Info',
                columns: [
                    {
                        Header: 'Name',
                        accessor: 'name',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Address',
                        accessor: 'address',
                        sortType: 'alphanumeric',
                    },
                ],
            },
            {
                Header: 'Order Info',
                columns: [
                    {
                        Header: 'Date',
                        accessor: 'date',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Order #',
                        accessor: 'order',
                        sortType: 'alphanumeric',
                    },
                    {
                        Header: 'Info',
                        accessor: 'info',
                        Cell: props => <button onClick={() => submitClick(props.value)}>Buy</button>
                    },
                ],
            },
        ],
        []
    )

    const data = React.useMemo(() =>
        [
            {
                name: 'Kim Parrish',
                address: '4420 Valley Street, Garnerville, NY 10923',
                date: '07/11/2020',
                order: '87349585892118',
            },
            {
                name: 'Michele Castillo',
                address: '637 Kyle Street, Fullerton, NE 68638',
                date: '07/11/2020',
                order: '58418278790810',
            },
            {
                name: 'Eric Ferris',
                address: '906 Hart Country Lane, Toccoa, GA 30577',
                date: '07/10/2020',
                order: '81534454080477',
            },
            {
                name: 'Gloria Noble',
                address: '2403 Edgewood Avenue, Fresno, CA 93721',
                date: '07/09/2020',
                order: '20452221703743',
            },
            {
                name: 'Darren Daniels',
                address: '882 Hide A Way Road, Anaktuvuk Pass, AK 99721',
                date: '07/07/2020',
                order: '22906126785176',
            },
            {
                name: 'Ted McDonald',
                address: '796 Bryan Avenue, Minneapolis, MN 55406',
                date: '07/07/2020',
                order: '87574505851064',
                info: 'sdfsdfsdfsdf',
                a: 'eefdfs',
            },
        ],
        []
    )

    return (
        <Styles>
          <Table
            columns={columns}
            data={data}
            getRowProps={row => ({
              onClick: () => alert(JSON.stringify(row.values)),
              style: {
                cursor: "pointer"
              }
            })}
          />
        </Styles>
    );
}