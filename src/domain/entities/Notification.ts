export class NotificationEntity {
  constructor(

        public userId: string,

        public title: string,

        public message: string,

        public isRead?: boolean,

        public time?:string,

        public link?:string,

        public id?:string,

  ) { }
}
