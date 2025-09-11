import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import * as Api from '../Api/Api'

export default function useLoading() {
    const [isLoading, setIsLoading] = React.useState(false) 
    const [isPageItemsLoading, setIsPageItemsLoading] = React.useState(false);

    const openLoading = () => {
        setIsLoading(true)
      }
    
    const closeLoading = () => {
        setIsLoading(false)
      }

  return {
    openLoading,
    closeLoading,
    isLoading,
    isPageItemsLoading,
    setIsPageItemsLoading
  };

};