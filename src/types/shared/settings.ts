import {
  GeneralAndGlobalPermissionsKeys,
  GetPermissionValueArray,
  PermissionGeneral,
} from "./auth";

export const getPermissionValues: GetPermissionValueArray = (group, key) => {
  return key.map((e) => {
    const ret1 = permissionsBase[group].permissions;
    return ret1[e as keyof typeof ret1];
  });
};

export const getPermissionGeneral = (key: GeneralAndGlobalPermissionsKeys) => {
  const perm: PermissionGeneral = {
    calendar: getPermissionValues("calendar", [
      "visualizar",
      "visualizarApenasOsProprios",
    ]),
    meetings: [
      ...getPermissionValues("meetings", ["abrir", "modificar", "visualizar"]),
    ],
    projects: [
      ...getPermissionValues("projects", [
        "cadastrar",
        "validar",
        "visualizar",
        "gerarRelatorios",
      ]),
    ],
    reports: getPermissionValues("reports", ["gerarRelatorios"]),
    configurations: [], // Add appropriate values here
    users: [], // Add appropriate values here
  };

  return perm[key] || [];
};

export const permissionsBase = {
  configurations: {
    icon: "solar:settings-bold",
    permissions: {
      visualizarConfiguracoes: "12.00",
      modificarConfiguracoes: "12.01",
    },
  },
  users: {
    icon: "solar:users-group-bold",
    permissions: {
      visualizarUsuarios: "14.00",
      adicionarUsuarios: "14.01",
      modificarUsuarios: "14.02",
      deletarUsuarios: "14.03",
    },
  },
  calendar: {
    icon: "solar:calendar-date-bold",
    permissions: {
      visualizarApenasAsPropriasReunioes: "11.04",
      visualizar: "11.00",
      modificar: "11.01",
      agendarReuniao: "11.05", // Permissão para o Professor Orientador
    },
  },
  meetings: {
    icon: "solar:library-bold-duotone",
    permissions: {
      gerente: "13.50", // Permissão geral de gerenciamento, para o Gestor da Fábrica
      abrirReuniao: "13.03",
      editarReuniaoPendente: "13.05",
      visualizarReuniaoFinalizada: "13.02",
      editarReuniaoFinalizada: "13.03",
      deletarReuniao: "13.04",
    },
  },
  projects: {
    icon: "solar:project-bold",
    permissions: {
      cadastrarProjeto: "17.00", // Permissão para o Gestor
      cadastrarIdeiaProjeto: "17.04",
      validarProjeto: "17.01", // Permissão para o Gestor da Fábrica
      visualizarProjetosPublicos: "17.02", // Permissão para Usuário Público
      gerarRelatorios: "17.03", // Permissão para o Gestor da Fábrica
    },
  },
  reports: {
    icon: "solar:report-bold",
    permissions: {
      gerarRelatorios: "18.00",
    },
  },
};
