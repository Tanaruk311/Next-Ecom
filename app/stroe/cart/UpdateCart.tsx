import { Button } from "@/components/ui/button"
import { useCartStore } from "../CartStore"
import { Minus, Plus } from "lucide-react"


const UpdateCart = ({id,quantity}:{id:string,quantity:number}) => {
const updateQuantity = useCartStore((state) => state.updateQuantity) 


  return (
    <div className="flex items-center space-x-2">     
        <Button
        variant="outline"
        size="icon"
        onClick={()=> {updateQuantity(id, quantity - 1)}}
        disabled={quantity <= 1}>
           <Minus className="w-4 h-4" /> 
        </Button>
        
        <span className="w-8 text-center text-sm">{quantity}</span>

        <Button
        variant="outline"
        size="icon"
        onClick={()=> {updateQuantity(id, quantity + 1)}}
       >
               <Plus className="w-4 h-4" /> 
        </Button>
        
    </div>
  )
}
export default UpdateCart