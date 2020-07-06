cube(`Request`, {
  sql: `SELECT * FROM dbgestionocupacion.request`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [boardId, projectId, taskId, reqTitle, staId, reqLastUpdateDate, reqDate, reqInitDate, reqFinalDate, reqRealFinalDate]
    }
  },
  
  dimensions: {
    boardId: {
      sql: `board_id`,
      type: `string`
    },
    
    projectId: {
      sql: `project_id`,
      type: `string`
    },
    
    taskId: {
      sql: `task_id`,
      type: `string`
    },
    
    reqMsProject: {
      sql: `req_ms_project`,
      type: `string`
    },
    
    reqTitle: {
      sql: `req_title`,
      type: `string`
    },
    
    reqDescription: {
      sql: `req_description`,
      type: `string`
    },
    
    reqResponsable: {
      sql: `req_responsable`,
      type: `string`
    },
    
    staId: {
      sql: `sta_id`,
      type: `string`
    },
    
    reqAdvancePtge: {
      sql: `req_advance_ptge`,
      type: `string`
    },
    
    reqDeviationsPtge: {
      sql: `req_deviations_ptge`,
      type: `string`
    },
    
    reqClientCompletedDeliverables: {
      sql: `req_client_completed_deliverables`,
      type: `string`
    },
    
    reqClientPendingActivities: {
      sql: `req_client_pending_activities`,
      type: `string`
    },
    
    reqClientComments: {
      sql: `req_client_comments`,
      type: `string`
    },
    
    reqIntelixCompletedDeliverables: {
      sql: `req_intelix_completed_deliverables`,
      type: `string`
    },
    
    reqIntelixPendingActivities: {
      sql: `req_intelix_pending_activities`,
      type: `string`
    },
    
    reqIntelixComments: {
      sql: `req_intelix_comments`,
      type: `string`
    },
    
    reqComiteePointsDiscuss: {
      sql: `req_comitee_points_discuss`,
      type: `string`
    },
    
    reqCargar: {
      sql: `req_cargar`,
      type: `string`
    },
    
    reqLastUpdateDate: {
      sql: `req_last_update_date`,
      type: `time`
    },
    
    reqDate: {
      sql: `req_date`,
      type: `time`
    },
    
    reqInitDate: {
      sql: `req_init_date`,
      type: `time`
    },
    
    reqFinalDate: {
      sql: `req_final_date`,
      type: `time`
    },
    
    reqRealFinalDate: {
      sql: `req_real_final_date`,
      type: `time`
    }
  }
});
