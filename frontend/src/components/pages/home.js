import React, { useMemo, useState, useEffect } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components'

const Styles = styled.div`
table {
    border-spacing: 0;
    border: 1px solid #ededed;
  }
  table tr:last-child td {
    border-bottom: 0;
  }
  table th,
  table td {
    margin: 0;
    padding: 0.5rem;
    border-bottom: 1px solid #ededed;
    border-right: 1px solid #ededed;
    position: relative;
  }
  table th:last-child,
  table td:last-child {
    border-right: 0;
  }
  table tr:nth-child(even) {
    background-color: #fafafa;
  }
  
  table th::before {
    position: absolute;
    right: 15px;
    top: 16px;
    content: "";
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  table th.sort-asc::before {
    border-bottom: 5px solid #22543d;
  }
  table th.sort-desc::before {
    border-top: 5px solid #22543d;
  }
  
  .App {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .badge {
    background-color: #9ae6b4;
    color: #22543d;
    margin-right: 4px;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
  }
  input {
    padding: 10px;
    margin-bottom: 20px;
    font-size: 18px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: none;
  }
  `

export default function Home() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Book\'s ID',
                accessor: 'id',
                sortType: 'alphanumeric',
            },
            {
                Header: 'Book\'s Name',
                accessor: 'name',
                sortType: 'alphanumeric',
            },
            {
                Header: 'Book\'s ISBN',
                accessor: 'phone',
                sortType: 'alphanumeric',
            },
            {
                Header: 'Book\'s Price',
                accessor: 'website',
                sortType: 'alphanumeric',
            },
        ],
    )

    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await axios("https://jsonplaceholder.typicode.com/users");
            setData(result.data);
        })();
    }, []);

    const navigate = useNavigate();

    const toInfoPage = (data) => {
        navigate('/info', { state: data });
    }

    return (
        <Styles>
            <Table
                columns={columns}
                data={data}
                getRowProps={row => ({
                    onClick: () => toInfoPage(JSON.stringify(row.values)),
                    style: {
                        cursor: "pointer"
                    }
                })}
            />
        </Styles>
    );
}



function Table({ columns, data, getRowProps = () => ({}) }) {
    const [filterInput, setFilterInput] = useState("");
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter
    } = useTable(
        {
            columns,
            data
        },
        useFilters,
        useSortBy
    );

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("name", value);
        setFilterInput(value);
    };

    // Render the UI for your table
    return (
        <>
            <input
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={"Search name"}
            />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={
                                        column.isSorted
                                            ? column.isSortedDesc
                                                ? "sort-desc"
                                                : "sort-asc"
                                            : ""
                                    }
                                >
                                    {column.render("Header")}
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
    );
}