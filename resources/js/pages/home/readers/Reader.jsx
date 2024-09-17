import React, { useEffect, useState } from 'react';
import {format_data_inputs, format_input_file} from '../../../components/helper.jsx';
import * as XLSX from "xlsx";
import { postDjangoData } from "../../../services/dataService.jsx";
import { notifyError } from "../../../components/notificationManager.jsx";

export const excelReader = ({file, type, setData, setLoading, setShowContent, setNoResult}) => {
    const reader = new FileReader();

    reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        let jsonData = [];

        workbook.SheetNames.forEach(sheet => {
            const sheet_name = sheet;
            const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            jsonData.push({sheet_name, sheetData});
        });

        if(jsonData.length === 0) {
            setNoResult(true);
            setShowContent(false);
        }
        else {
            setData(jsonData);
            setShowContent(true);
        }
        setLoading(false);
    };

    reader.readAsArrayBuffer(file);
}


export const pdfReader = async ({file, type, setData, setLoading, setShowContent, setNoResult}) => {
    setLoading(true);
    const data = format_data_inputs({
        file: file,
        type: 'legrand'
    })
    postDjangoData(data)
        .then((response) => {
            const data = response.data;
            if(data.length === 0) {
                setNoResult(true);
                setShowContent(false);
            }
            else {
                setData(data);
                setShowContent(true);
            }
        })
        .catch((error) => {
            console.error(error)
            notifyError(error.response ? error.response.data.message : error.message);
        })
        .finally(() => {
            setLoading(false);
        });
}
