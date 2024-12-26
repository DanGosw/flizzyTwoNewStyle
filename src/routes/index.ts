const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/", name: "home", component: () => import("@/pages/private/layout.vue"),
            meta: { prefetch: true }, redirect: { name: "dashboard", force: true },
            children: [
                {
                    path: "/dashboard", name: "dashboard", component: () => import("@/modules/HelloWorld.vue"),
                    meta: { label: "Dashboard", icon: IconLucideLayoutDashboard }
                },
                {
                    path: "/till", name: "till", component: () => import("@/modules/HelloWorld.vue"),
                    meta: { label: "Caja", icon: IconIcBaselinePointOfSale }
                },
                {
                    path: "/table", name: "table", component: () => import("@/modules/tables/viewTables.vue"),
                    meta: { label: "Mesas", icon: IconMaterialSymbolsDiningOutline }
                },
                {
                    path: "/orders", name: "orders", component: () => import("@/modules/HelloWorld.vue"),
                    meta: { label: "Pedidos", icon: IconMaterialSymbolsLightInactiveOrder }
                },
                {
                    path: "/sales", name: "sales", component: () => import("@/modules/index.vue"),
                    meta: { label: "Ventas", icon: IconSolarDollarLinear, expand: "debts" },
                    children: [
                        {
                            path: "/add/debts", name: "newSales", component: () => import("@/modules/HelloWorld.vue"),
                            meta: { label: "Nueva Venta", icon: IconMaterialSymbolsLibraryAdd }
                        },
                        {
                            path: "/edit/debts", name: "listSales", component: () => import("@/modules/HelloWorld.vue"),
                            meta: { label: "Lista de Ventas", icon: IconBxBxsCalendarEdit }
                        }
                    ]
                },
                {
                    path: "/products", name: "products", component: () => import("@/modules/index.vue"),
                    meta: { label: "Productos", icon: IconMaterialSymbolsFastfoodRounded, expand: "users" },
                    children: [
                        {
                            path: "/add/users", name: "addProducts", component: () => import("@/modules/HelloWorld.vue"),
                            meta: { label: "Crear Producto", icon: IconTablerUsersPlus }
                        },
                        {
                            path: "/edit/users", name: "listProducts", component: () => import("@/modules/HelloWorld.vue"),
                            meta: { label: "Listado de Productos", icon: IconIcSharpEditNote }
                        }
                    ]
                },
                {
                    path: "/suppliers", name: "suppliers", component: () => import("@/modules/HelloWorld.vue"),
                    meta: { label: "Proveedores", icon: IconFluentBuildingPeople16Filled, expand: "suppliers" },
                    children: [
                        {
                            path: "/add/provider", name: "newSupplier", component: () => import("@/modules/HelloWorld.vue"),
                            meta: { label: "Crear Proveedor", icon: IconTablerUsersPlus }
                        },
                        {
                            path: "/list/accounts", name: "listSuppliers", component: () => import("@/modules/HelloWorld.vue"),
                            meta: { label: "Lista de Proveedores", icon: IconMaterialSymbolsListAltRounded }
                        }
                    ]
                },
                {
                    path: "/ingredients", name: "ingredients", component: () => import("@/modules/HelloWorld.vue"),
                    meta: { label: "Insumos", icon: IconMaterialSymbolsKitchen }
                },
                {
                    path: "/kardex", name: "kardex", component: () => import("@/modules/HelloWorld.vue"),
                    meta: { label: "Kardex", icon: IconMaterialSymbolsLightBarChart4BarsRounded, expand: "kardex" }
                },
                {
                    path: "/people", name: "people", component: () => import("@/modules/index.vue"),
                    meta: { label: "Personas", icon: IconSolarUsersGroupRoundedLinear, expand: "people" },
                    children: [
                        {
                            path: "/customer", name: "customer", component: () => import("@/modules/customer/customer.vue"),
                            meta: { label: "Clientes", icon: IconSolarUsersGroupRoundedLinear }
                        },
                        {
                            path: "/birthdays", name: "birthdays", component: () => import("@/modules/HelloWorld.vue"),
                            meta: { label: "Cumpleaños", icon: IconIconoirBirthdayCake }
                        }
                    ]
                },
                {
                    path: "/settings", name: "settings", component: () => import("@/modules/settings/index.vue"),
                    meta: { label: "Configuración", icon: IconMaterialSymbolsSettingsOutline }
                },
                // Private Routes without meta
                {
                    path: "/users", name: "users", component: () => import("@/modules/settings/users/users.vue")
                },
                {
                    path: "/business", name: "business", component: () => import("@/modules/settings/business/business.vue")
                },
                {
                    path: "/branch", name: "branch", component: () => import("@/modules/settings/branchs/branchs.vue")
                },
                {
                    path: "/application", name: "application", component: () => import("@/modules/settings/application/index.vue")
                }
            ]
        },
        
        // Public Routes
        {
            path: "/login", name: "login", component: () => import("@/pages/public/login.vue")
            // meta: { label: "Login", icon: IconMajesticonsAnalyticsDelete }
        },
        {
            path: "/:catchAll(.*)", name: "Page not found",
            beforeEnter: (to, from, next) => next({ path: "/" })
        }
    ]
});

export default router;
