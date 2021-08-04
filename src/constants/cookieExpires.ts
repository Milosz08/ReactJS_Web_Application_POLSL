const cookieExpires = (expDays: number) => {
   let date = new Date();
   date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
   return date;
}

export default cookieExpires;