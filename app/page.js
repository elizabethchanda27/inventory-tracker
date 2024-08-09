"use client"
import Image from "next/image";
import {useState, useEffect} from "react";
import {firestore} from "@/firebase";
import { Box, Modal, Typography, Stack, TextField, Button} from "@mui/material";
import { collection, deleteDoc, doc, getDocs, query, getDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]) //Store inventory
  const [open, setOpen] = useState([false]) //Add and Remove
  const [itemName, setItemName] = useState(['']) //Store the name of the item we type out
  const [searchQuery, setSearchQuery] = useState(''); //Store search query
  const [filteredInventory, setFilteredInventory] = useState([]); //Store filtered inventory


  
  //Updating from firebase
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => { //for every doc, we want to add it to our inventory list; push a new object
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    setFilteredInventory(inventoryList)
  }

  //Function for adding items
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    }
    else { //set the quantity to 1 and update inventory
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  //Function for removing items
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      }
      else { //if it doesn't exist, we do nothing
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory()
  }

  //Runs the code above (will run only once cause nothing in dependency array)
  //Only update when page loads
  useEffect(() => {
    updateInventory()
  }, [])

  //Model Functions
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen (false)

  //Filter inventory based on search query
  useEffect(() => {
    const filtered = inventory.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInventory(filtered);
  }, [searchQuery, inventory]);


  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center" 
      gap={2}
      sx={{
        backgroundImage: "url('/images/fruits-wallpaper-1.jpg')", // Set your background image URL here
        backgroundSize: 'cover', // Adjust size to cover the whole container
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Prevent repeating of the image
        position: 'relative' // Ensure that child elements are positioned relative to this container
      }}
      >
          <Box
          border='1px solid #333'
          bgcolor="rgba(255, 255, 255, 0.8)" // Semi-transparent background for the inventory items box
          padding={2} // Added padding for spacing inside the box
          borderRadius={1} // Added rounded corners for visual appeal
          width="800px" // Ensure the box takes up the specified width
        >
        <Modal open={open} onClose={handleClose}>
          <Box
            position= "absolute"
            top="50%"
            left="50%"
            width={400}
            bgcolor="white" 
            border="2px solid #000"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{
              transform: "translate(-50%,-50%)",
            }}
          >
            <Typography>Add Item</Typography>   
            <Stack width ="100" direction="row" spacing = {2}>
              <TextField
                variant='outlined'
                fullWidth
                value={itemName}
                onChange={(e)=> {
                  setItemName(e.target.value)
                }}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }}>
                  Add
                </Button>
              </Stack>
          </Box>
        </Modal>
        <Button variant = "contained" onClick={()=> {
          handleOpen()
        }}>
          Add New Item
        </Button>
        <TextField
          variant='outlined'
          placeholder='Search...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: 2, width: '100%' }}
        />
    <Box border= '1px solid #333'>
      <Box 
        width = "764px"
        height = "100px"
        bgcolor = "#ADD8E6"
        display = "flex"
        alignItems = "center"
        justifyContent = "center"
      >
        <Typography variant = 'h2' color = '#333'>
        Inventory Items 
        </Typography>
      </Box>
    <Stack width = "800px" height = "300 px" spacing = {2} overflow = "auto">
      {
        filteredInventory.map(({name,quantity}) => (
          <Box
            key = {name} 
            width = "100%" 
            minHeight = "150px"
            display = "flex"
            alignItems = "center"
            justifyContent = "space-between"
            bgColor = "#f0f0f0"
            padding = {8}
            >
              <Typography variant = "h3" color = "#333" textAlign = "center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant = "h3" color = "#333" textAlign = "center">
                {quantity}
              </Typography>
              <Stack direction = "row" spacing = {2}>              
              <Button 
                variant = "contained" 
                onClick={() => 
                addItem(name) }
              >
                Add
              </Button>
              <Button 
                variant = "contained" 
                onClick={() =>
                removeItem(name) }
              >
                Remove
              </Button>
              </Stack>
          </Box>
        ))}
    </Stack>
    </Box>
  </Box>
  </Box>
  )
}
