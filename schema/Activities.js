cube(`Activities`, {
  sql: `SELECT * FROM dbgestionocupacion.activities`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [actTrelloName, actCardId, actIdUserTrello, actTitle, actInitDate, actInitRealDate, actEndDate, actRealEndDate]
    }
  },
  
  dimensions: {
    actTrelloName: {
      sql: `act_trello_name`,
      type: `string`
    },
    
    actDescriptionTrello: {
      sql: `act_description_trello`,
      type: `string`
    },
    
    actCardId: {
      sql: `act_card_id`,
      type: `string`
    },
    
    actEstimatedHours: {
      sql: `act_estimated_hours`,
      type: `string`
    },
    
    actIdUserTrello: {
      sql: `act_id_user_trello`,
      type: `string`
    },
    
    actTimeLoaded: {
      sql: `act_time_loaded`,
      type: `string`
    },
    
    actStatus: {
      sql: `act_status`,
      type: `string`
    },
    
    actTitle: {
      sql: `act_title`,
      type: `string`
    },
    
    actMail: {
      sql: `act_mail`,
      type: `string`
    },
    
    actTrelloUser: {
      sql: `act_trello_user`,
      type: `string`
    },
    
    actInitDate: {
      sql: `act_init_date`,
      type: `time`
    },
    
    actInitRealDate: {
      sql: `act_init_real_date`,
      type: `time`
    },
    
    actEndDate: {
      sql: `act_end_date`,
      type: `time`
    },
    
    actRealEndDate: {
      sql: `act_real_end_date`,
      type: `time`
    }
  }
});
