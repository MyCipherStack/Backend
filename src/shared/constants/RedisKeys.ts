import payments from "razorpay/dist/types/payments";



export const RedisKeys={

paymentLock:(userId:string)=>`payment_lock${userId}`,

}