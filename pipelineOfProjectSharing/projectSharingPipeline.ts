// Example Project Sharing Document
const dataJson ={
    _id: ObjectId("65a7d1234567890abcdef123"),
    projectId: ObjectId("65a7d1234567890abcdef000"),
    projectUniqueId: "PROJ-2024-001",
    projectName: "Regional Logistics Network",
    status: "Active",
    createdAt: ISODate("2024-01-17T10:00:00Z"),
    updatedAt: ISODate("2024-01-17T10:00:00Z"),
    
    nodes: [
      // H1 - Root Node
      {
        userId: ObjectId("user_h1"),
        userName: "MainHauler Inc",
        organizationId: ObjectId("org_h1"),
        organizationName: "MainHauler Corporation",
        email: "admin@mainhauler.com",
        mobileNumber: "1234567890",
        countryCode: "+1",
        
        parentId: null,
        level: 0,
        path: [ObjectId("user_h1")],
        
        access: {
          cost: true,
          inviteUser: true,
          viewAnalytics: true
        },
        
        status: "Active",
        grantedAt: ISODate("2024-01-17T10:00:00Z"),
        grantedBy: null,
        revokedAt: null,
        revokedBy: null,
        
        displayName: "MainHauler Inc",
        displayOrganization: "MainHauler Corporation"
      },
      
      // H2 - First Level
      {
        userId: ObjectId("user_h2"),
        userName: "FastFreight",
        organizationId: ObjectId("org_h2"),
        organizationName: "FastFreight Services",
        email: "manager@fastfreight.com",
        mobileNumber: "2345678901",
        countryCode: "+1",
        
        parentId: ObjectId("user_h1"),
        level: 1,
        path: [ObjectId("user_h1"), ObjectId("user_h2")],
        
        access: {
          cost: true,
          inviteUser: true,
          viewAnalytics: false
        },
        
        status: "Active",
        grantedAt: ISODate("2024-01-17T11:00:00Z"),
        grantedBy: ObjectId("user_h1"),
        revokedAt: null,
        revokedBy: null,
        
        displayName: "FastFreight",
        displayOrganization: "FastFreight Services"
      },
  
      // H3 - First Level
      {
        userId: ObjectId("user_h3"),
        userName: "QuickHaul",
        organizationId: ObjectId("org_h3"),
        organizationName: "QuickHaul Logistics",
        email: "manager@quickhaul.com",
        mobileNumber: "3456789012",
        countryCode: "+1",
        
        parentId: ObjectId("user_h1"),
        level: 1,
        path: [ObjectId("user_h1"), ObjectId("user_h3")],
        
        access: {
          cost: true,
          inviteUser: true,
          viewAnalytics: false
        },
        
        status: "Active",
        grantedAt: ISODate("2024-01-17T11:30:00Z"),
        grantedBy: ObjectId("user_h1"),
        revokedAt: null,
        revokedBy: null,
        
        displayName: "QuickHaul",
        displayOrganization: "QuickHaul Logistics"
      },
      
      // H4 - Under H2
      {
        userId: ObjectId("user_h4"),
        userName: "SpeedCargo",
        organizationId: ObjectId("org_h4"),
        organizationName: "SpeedCargo Express",
        email: "ops@speedcargo.com",
        mobileNumber: "4567890123",
        countryCode: "+1",
        
        parentId: ObjectId("user_h2"),
        level: 2,
        path: [ObjectId("user_h1"), ObjectId("user_h2"), ObjectId("user_h4")],
        
        access: {
          cost: false,
          inviteUser: false,
          viewAnalytics: false
        },
        
        status: "Active",
        grantedAt: ISODate("2024-01-17T12:00:00Z"),
        grantedBy: ObjectId("user_h2"),
        revokedAt: null,
        revokedBy: null,
        
        displayName: "FastFreight",  // Shows parent's name for attribution
        displayOrganization: "FastFreight Services"
      },
      
      // H5 - Under H2
      {
        userId: ObjectId("user_h5"),
        userName: "CityLogistics",
        organizationId: ObjectId("org_h5"),
        organizationName: "City Logistics Co",
        email: "ops@citylogistics.com",
        mobileNumber: "5678901234",
        countryCode: "+1",
        
        parentId: ObjectId("user_h2"),
        level: 2,
        path: [ObjectId("user_h1"), ObjectId("user_h2"), ObjectId("user_h5")],
        
        access: {
          cost: false,
          inviteUser: false,
          viewAnalytics: false
        },
        
        status: "Active",
        grantedAt: ISODate("2024-01-17T12:30:00Z"),
        grantedBy: ObjectId("user_h2"),
        revokedAt: null,
        revokedBy: null,
        
        displayName: "FastFreight",  // Shows parent's name for attribution
        displayOrganization: "FastFreight Services"
      }
    ],
    
    sharingHistory: [
      {
        fromUserId: ObjectId("user_h1"),
        toUserId: ObjectId("user_h2"),
        action: "GRANTED",
        timestamp: ISODate("2024-01-17T11:00:00Z")
      },
      {
        fromUserId: ObjectId("user_h1"),
        toUserId: ObjectId("user_h3"),
        action: "GRANTED",
        timestamp: ISODate("2024-01-17T11:30:00Z")
      },
      {
        fromUserId: ObjectId("user_h2"),
        toUserId: ObjectId("user_h4"),
        action: "GRANTED",
        timestamp: ISODate("2024-01-17T12:00:00Z")
      },
      {
        fromUserId: ObjectId("user_h2"),
        toUserId: ObjectId("user_h5"),
        action: "GRANTED",
        timestamp: ISODate("2024-01-17T12:30:00Z")
      }
    ]
  }
  
  // Sample Tickets Collection
  const sampleTickets={
    _id: ObjectId("ticket1"),
    projectId: ObjectId("65a7d1234567890abcdef000"),
    title: "Delivery Delay Report",
    description: "Route 27 experiencing delays",
    createdBy: ObjectId("user_h4"),  // Created by H4
    createdAt: ISODate("2024-01-17T13:00:00Z"),
    status: "Open"
  }