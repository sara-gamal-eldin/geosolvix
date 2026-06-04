// Initial/default spatial scenario for Greater London Bicycle analysis
export const londonInitialScenario = {
  cityName: "London",
  plan: [
    "Identify critical urban transit sectors and bottleneck corridors across London database regions.",
    "Formulate 8 core geographic centroid locations based on demographic density overlays.",
    "Pose hyper-pointed structural optimization questions for each coordinate node.",
    "Map interactive pins on high-resolution Google Satellite imagery layers for direct expert feedback.",
  ],
  explanation:
    "Our agentic network evaluated raw transit and demographic records directly within London BigQuery partitions. We isolated 8 high-density coordinates and formatted active, AI-generated infrastructure optimization questions to map over the Google Satellite visual basemap layer.",
  sql: "-- NATIVE GEOSOLVIX BIGQUERY DIRECT SPATIAL AGENT QUERY\nSELECT node_id, name, latitude, longitude,\n       ST_GEOGPOINT(longitude, latitude) as point_geom,\n       'AI Question' as analytical_node_type\nFROM `bigquery-public-data.london_infrastructure.geospatial_nodes`\nWHERE region_classification = 'Greater London'\nORDER BY density_score DESC\nLIMIT 8;",
  features: [
    {
      id: "p1",
      name: "AI Question #1",
      category: "Congestion Bottleneck",
      latitude: 51.5007,
      longitude: -0.1246,
      metric: 94,
      notes:
        "How can we optimize commuter bike flow and eliminate queue lines between Westminster and Waterloo?",
    },
    {
      id: "p2",
      name: "AI Question #2",
      category: "Infrastructure Adequacy",
      latitude: 51.5014,
      longitude: -0.1921,
      metric: 78,
      notes:
        "Is the cycle lane capacity in Kensington sufficient to support peak morning checkouts?",
    },
    {
      id: "p3",
      name: "AI Question #3",
      category: "Socio-Economic Demand",
      latitude: 51.5262,
      longitude: -0.0768,
      metric: 88,
      notes:
        "Should we deploy a new central micro-mobility corridor near Shoreditch to support tech commuting?",
    },
    {
      id: "p4",
      name: "AI Question #4",
      category: "Flow Acceleration",
      latitude: 51.5033,
      longitude: -0.1017,
      metric: 85,
      notes:
        "Where are the primary obstruction nodes causing cyclist delays along Southwark River Corridor?",
    },
    {
      id: "p5",
      name: "AI Question #5",
      category: "Catchment Range",
      latitude: 51.4826,
      longitude: -0.0077,
      metric: 52,
      notes:
        "What is the optimal service buffer size for the Greenwich leisure station network?",
    },
    {
      id: "p6",
      name: "AI Question #6",
      category: "Parking Security",
      latitude: 51.5218,
      longitude: -0.1601,
      metric: 91,
      notes:
        "Can we relocate local vehicle parking slots in Marylebone to secure high-volume cycle routes?",
    },
    {
      id: "p7",
      name: "AI Question #7",
      category: "Multimodal Friction",
      latitude: 51.5234,
      longitude: -0.1072,
      metric: 67,
      notes:
        "How do we minimize transit transfer friction at the Clerkenwell Intersect during high rain levels?",
    },
    {
      id: "p8",
      name: "AI Question #8",
      category: "Junction Integration",
      latitude: 51.4862,
      longitude: -0.1229,
      metric: 72,
      notes:
        "Which missing lane segments prevent continuous safe transit from Vauxhall to Westminster?",
    },
  ],
};

// Selection of quick interactive templates
export const sampleTemplates = [
  {
    title: "SF Transit Hub Clashes",
    prompt:
      "Show SF Muni lines intersecting with high population density nodes inside commercial zones.",
    city: "San Francisco",
  },
  {
    title: "NYC Storm Damage Risk",
    prompt:
      "Map NYC coastal properties lying within a 500 meter buffer of historical flood surge contours.",
    city: "New York City",
  },
  {
    title: "Paris Retail Catchments",
    prompt:
      "Locate Paris districts lacking premium grocery stores within a 1.5km walking radius.",
    city: "Paris",
  },
];

export const trainingCourses = [
  {
    id: "GIS-101",
    title: "Level 1: GIS Fundamentals",
    target: "Absolute Beginners, Students, Career Switchers",
    duration: "Self-Paced (8 Modules)",
    level: "Beginner",
    prerequisite: "None",
    icon: "globe",
    description:
      "Master the core foundations of Geographic Information Systems. From coordinate systems to spatial analysis — build the skills that every GIS professional needs.",
    topics: [
      "Introduction to GIS and Its Real-World Applications",
      "Understanding Coordinate Systems and Map Projections",
      "Working with Vector and Raster Data Types",
      "Exploring GIS Data Sources, Formats, and Quality",
      "Managing Attribute Tables and Running Spatial Queries",
      "Performing Basic Spatial Analysis: Buffer, Overlay, and Clip",
      "Designing Clear and Effective Map Layouts",
      "Getting Started with GIS Software Interface and Tools",
    ],
    outline: [
      {
        day: "Module 1-2",
        topic: "Core concepts, projections, coordinate systems, and data types (Vector vs Raster)",
      },
      {
        day: "Module 3-5",
        topic: "Data sourcing, attribute management, and SQL spatial queries",
      },
      {
        day: "Module 6-8",
        topic: "Practical spatial analysis (buffers/overlays), map design principles, and UI familiarization",
      },
    ],
    badge: "Start Here",
  },
  {
    id: "GIS-201",
    title: "Level 2: GIS Data Structure and Design",
    target: "Data Managers, GIS Technicians, Analysts",
    duration: "Self-Paced (5 Modules)",
    level: "Intermediate",
    prerequisite: "GIS-101 (Level 1)",
    icon: "database",
    description:
      "Learn how to properly organize and store spatial data. Move beyond messy shapefiles and master geodatabases, domains, subtypes, and data validation rules.",
    topics: [
      "File Geodatabases vs. Shapefiles",
      "Designing Schemas and Feature Classes",
      "Setting up Domains and Subtypes",
      "Topology Rules and Spatial Validation",
      "Managing Metadata and Documentation",
    ],
    outline: [
      {
        day: "Module 1-2",
        topic: "Transitioning to Geodatabases: Structuring folders, datasets, and feature classes",
      },
      {
        day: "Module 3-4",
        topic: "Enforcing data integrity using Domains (dropdowns) and Subtypes for clean data entry",
      },
      {
        day: "Module 5",
        topic: "Applying basic Topology rules to prevent overlaps, gaps, and drawing errors",
      },
    ],
    badge: "Step 2",
  },
  {
    id: "GIS-301",
    title: "Level 3: Map Design & Visual Communication",
    target: "GIS Technicians, Urban Planners, Researchers",
    duration: "Self-Paced (5 Modules)",
    level: "Intermediate",
    prerequisite: "GIS-201 (Level 2)",
    icon: "pen-tool",
    description:
      "Turn plain data into beautiful, easy-to-understand maps. Learn the rules of cartography, choosing the right colors, and designing layouts for printing or reports.",
    topics: [
      "The Rules of Good Cartography",
      "Choosing Colors for Data (Choropleth Maps)",
      "Labeling and Typography",
      "Adding Legends, Scale Bars, and North Arrows",
      "Exporting High-Quality Maps for Print",
    ],
    outline: [
      {
        day: "Module 1-2",
        topic: "Visual hierarchy, choosing the right symbols, and mapping numerical data correctly",
      },
      {
        day: "Module 3-4",
        topic: "Advanced labeling techniques and setting up a professional map layout page",
      },
      {
        day: "Module 5",
        topic: "Exporting maps in different formats (PDF/PNG) for reports and presentations",
      },
    ],
    badge: "Step 3",
  },
  {
    id: "GIS-401",
    title: "Level 4: Solving Problems with Spatial Analysis",
    target: "Analysts, Researchers, Decision Makers",
    duration: "Self-Paced (6 Modules)",
    level: "Intermediate",
    prerequisite: "GIS-301 (Level 3)",
    icon: "layers",
    description:
      "Start using your maps to make decisions. Learn how to combine layers, find the best locations, and measure distances to answer real-world questions.",
    topics: [
      "Proximity Analysis (Creating Buffers)",
      "Overlay Analysis (Intersect & Union)",
      "Filtering Data by Location",
      "Finding the Closest Facilities",
      "Summarizing Data within Boundaries",
    ],
    outline: [
      {
        day: "Module 1-2",
        topic: "Measuring distances and creating safety zones or catchment areas using Buffers",
      },
      {
        day: "Module 3-4",
        topic: "Combining multiple datasets using Intersect and Union to find overlaps",
      },
      {
        day: "Module 5-6",
        topic: "Summarizing populations within specific areas and exporting the results",
      },
    ],
    badge: "Step 4",
  },
  {
    id: "GIS-501",
    title: "Level 5: Sharing Maps Online",
    target: "GIS Technicians, Planners, Small Business Owners",
    duration: "Self-Paced (4 Modules)",
    level: "Intermediate",
    prerequisite: "GIS-401 (Level 4)",
    icon: "cloud",
    description:
      "Move away from static PDF maps. Learn how to easily upload your data to the cloud and share interactive maps with your team or the public without any coding.",
    topics: [
      "Introduction to Cloud GIS",
      "Uploading and Hosting Shapefiles",
      "Styling Interactive Web Maps",
      "Configuring Map Pop-ups",
      "Sharing Maps via Links or Embedding",
    ],
    outline: [
      {
        day: "Module 1-2",
        topic: "Preparing local data for the web and uploading it to a cloud mapping platform",
      },
      {
        day: "Module 3-4",
        topic: "Setting up interactive pop-ups, styling the web map, and generating a shareable link",
      },
    ],
    badge: "Final Step",
  }
];

export const gisBlogs = [
  {
    id: "blog-01",
    title:
      "Esri ArcGIS Enterprise: Building High-Availability Distributed Topologies",
    excerpt:
      "Learn how to architect resilient, multi-tiered Enterprise GIS portals utilizing server federations, load-balanced datastores, and cache synchronization strategies.",
    category: "esri",
    categoryLabel: "Esri Tech Stack",
    author: "Richard Vance, Enterprise GIS Architect",
    date: "May 2026",
    duration: "8 min read",
    headerImage:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600",
    intro:
      "Modern municipal, national security, and key utility applications rely on uninterrupted spatial streams. For these mission-critical sectors, a single failure in the web adapter or database host could interrupt transit routers, emergency dispatches, or field telemetry syncing. This article details the structural blueprints of high-availability (HA) Esri ArcGIS Enterprise setups designed to withstand hardware loss and high traffic spikes.",
    sections: [
      {
        title: "1. The Active-Active Web GIS Blueprint",
        text: "Federating ArcGIS Server sites with Portal for ArcGIS requires active workload routing. Deploying redundant portal hubs paired with third-party load-balancers (such as AWS ALB, Citrix ADC, or NGINX) avoids single-point-of-failure vulnerabilities. Crucially, the configuration store and portal content directory must reside on highly accessible network storage systems like Amazon EFS, Azure Files, or an enterprise-grade SAN. Web Adaptors should be deployed in pairs behind the load-balancer to handle incoming HTTPS handshakes and seamlessly direct sessions to whichever Portal node possesses the active validation key.",
      },
      {
        title: "2. Structuring Relational & Tile Cache Datastores",
        text: "The ArcGIS Data Store operates in continuous primary-standby mode for standard feature services. To enable replication, configure a relational database store across dual virtual machine hosts connected by dedicated sub-millisecond network interfaces. When client updates populate the primary database, asynchronous replication continuously writes write-ahead logs (WAL) to the standby node. Should the primary node fall offline, the standby host coordinates with the ArcGIS Server site administrator to promote itself to active status. This automated failover reduces data modification gaps to less than 15 seconds.",
      },
      {
        title: "3. Enterprise Cache Sync and Vector Tile Performance",
        text: "Serving millions of concurrent map and feature requests requires caching. High Availability mandates storing static cache segments (.bundle systems) on synchronized clustering environments. While static caches represent low read-overhead overhead, modern applications leverage dynamic vector tile packages (VTPK). Directing clients to fetch specialized vector segments directly from a multi-node tile cache store minimizes CPU overhead on ArcGIS Server nodes. This architectural choice frees up process threads to focus on raw analysis and heavy linear network queries.",
      },
    ],
    conclusion:
      "Designing for uptime in complex spatial infrastructures is about removing single points of failure. By decoupling the presentation layer from the central geoprocessing and storage layers, organization authorities guarantee resilient, sub-second responses for field teams and the public.",
  },
  {
    id: "blog-02",
    title: "Esri Utility Network: Dynamic Topology and Outage Trace Algorithms",
    excerpt:
      "Transitioning from legacy geometric networks into ArcMap-free service-level network layers. How rules-based topological networks protect pipeline networks.",
    category: "esri",
    categoryLabel: "Esri Tech Stack",
    author: "Elena Rostov, Infrastructure Team Lead",
    date: "April 2026",
    duration: "7 min read",
    headerImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600",
    intro:
      "For generations, utilities relied on geometric networks inside legacy files. Now, Esri's Utility Network (UN) represents a new paradigm, supporting intricate modeling of assets with 3D elevations, structural attachments, and dynamic logic overlays, all managed securely via service-oriented REST endpoints.",
    sections: [
      {
        title: "1. Rules-Based Engineering Topologies",
        text: "Unlike geometric lines that permit arbitrary connections, the Utility Network enforces strict physical boundaries. Administrators define explicit connectivity rules (e.g., 'A 4-inch ductile iron gas line can connect to a 4-inch valve, but never a 12-inch water channel'). If a utility designer seeks to combine invalid materials, the engine generates persistent validation flags or completely blocks map check-ins. This rigid topology validation ensures clean, query-ready spatial records before any linear routing analyses are run.",
      },
      {
        title: "2. The Math Behind Outage Spill & Network Tracing",
        text: "Tracing downstream or upstream flows in a complex utility mesh involves breadth-first traversals on customized system graphs. When a water lateral pipe ruptures, the trace algorithm begins at the incident pinpoint, inspects the adjacent junction vertices, and steps from line to line. The solver continues traversing outward until it intercepts isolation valves capable of choking the flow. This dynamic query, executing over thousands of assets in milliseconds, is made possible because Esri represents network topologies as aggregated indexed matrices rather than real-time spatial intersections.",
      },
    ],
    conclusion:
      "By transitioning utility structures to explicit network engines, resource providers maintain perfect integrity in their digital twins and significantly speed up disaster containment operations.",
  },
  {
    id: "blog-03",
    title:
      "Unlocking PostGIS: Powerful Spatial Joins and Nearest Neighbor (KNN) Queries",
    excerpt:
      "Master geographic SQL queries in PostgreSQL. Discover how ST_DWithin and index-assisted nearest neighbor (KNN) calculations outperform conventional Python loops.",
    category: "opensource",
    categoryLabel: "Open Source GIS",
    author: "Mateo Silva, Core Spatial Database Engineer",
    date: "May 2026",
    duration: "6 min read",
    headerImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
    intro:
      "Many data scientists attempt to execute spatial checks by fetching raw coordinates into memory and executing nested loops in Python. This practice is slow and scales poorly. The proper solution is doing geospatial queries close to the data inside PostgreSQL using the PostGIS spatial engine.",
    sections: [
      {
        title: "1. The Power of Index-Assisted Spatial Joins",
        text: "Standard databases use B-Tree indexes for numbers and text. PostGIS leverages R-Tree indexes using the GiST (Generalized Search Tree) structure. GiST wraps geometries in Minimum Bounding Boxes (MBR). When executing spatial checks, the database first searches the 2D box structure to exclude irrelevant records (the primary filter). In step two, it runs mathematically precise formulas only on the remaining candidate geometries. This dual-phase approach speeds up queries on millions of polygon features.",
      },
      {
        title: "2. Ditching ST_Distance for ST_DWithin",
        text: "A frequent anti-pattern is executing queries like `ST_Distance(geom1, geom2) < 500`. To compute this, the database must evaluate the exact proximity of every single element in the system. Replacing this with `ST_DWithin(geom1, geom2, 500)` leverages the GiST index directly. The engine utilizes index bounding boxes to prune features further than the distance metric, instantly narrowing down the search space without executing a single slow distance calculation on excluded items.",
      },
      {
        title: "3. KNN Queries: Finding Closest Neighbors Instantly",
        text: "Suppose you want to locate the 5 closest water valves to a ruptured pipe node. Rather than computing distance to all valves, PostGIS uses the index distance operator `<->`. This operator traverses the GiST index tree, yielding results ranked by proximity directly. The query: `SELECT * FROM valves ORDER BY geom <-> ST_GeomFromText('POINT(x y)', 4326) LIMIT 5` completes in single-digit milliseconds, even on tables with millions of records.",
      },
    ],
    conclusion:
      "Treating geography as a native database type transforms geographic analysis. PostGIS provides the robust, standard queries needed to power fast, high-load web maps.",
  },
  {
    id: "blog-04",
    title: "Lightweight Web Mapping: Custom Shaders with MapLibre GL and OSM",
    excerpt:
      "Discover how to render vector tiles natively in the browser with OpenGL, configure custom rules, and avoid expensive map subscription fees.",
    category: "opensource",
    categoryLabel: "Open Source GIS",
    author: "Yuki Tanaka, Web GL/Map Developer",
    date: "April 2026",
    duration: "5 min read",
    headerImage:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600",
    intro:
      "Modern clients demand smooth 60fps zooming and dynamic, interactive styling. MapLibre GL - the highly active, community-maintained fork of Mapbox GL JS - solves this by drawing vector tiles natively on the browser GPU with WebGL.",
    sections: [
      {
        title: "1. Vector Tiles vs. Raster Tiles",
        text: "Raster tiles are pre-rendered images (.png files) delivered from a server. They are static, look pixelated when zoomed, and require expensive network transfers. Vector tiles, on the other hand, contain raw coordinate records and attribute tags (.mvt format). This allows the client browser to style, color, and label the maps dynamically. When a user zooms, coordinates are projected seamlessly by the GPU, ensuring crisp typography and rendering at any scale.",
      },
      {
        title: "2. OpenStreetMap (OSM) and Free Map Pipelines",
        text: "By coupling MapLibre GL with open vector tile servers (such as those powered by OpenMapTiles, Protomaps, or custom server clusters), developers can render global topographic maps with zero licensing fees. The vector layers are styled using a declarative JSON sheet, letting you swap themes, toggle labels, or color commercial zones based on client-side interactive variables.",
      },
    ],
    conclusion:
      "Building map systems on open frameworks gives organizations ownership over their visual identity and avoids licensing costs, ensuring maps are free to configure.",
  },
  {
    id: "blog-05",
    title: "PMTiles and FlatGeobuf: The Cloud-Native Vector Revolution",
    excerpt:
      "How serverless static files are replacing complex GIS servers. Serve gigabytes of geometry records directly from cost-effective public file buckets.",
    category: "cloudnative",
    categoryLabel: "Cloud Native Geospatial",
    author: "Marcus Vance, Geospatial Cloud Engineer",
    date: "May 2026",
    duration: "6 min read",
    headerImage:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=600",
    intro:
      "Historically, web maps required active, stateful servers like GeoServer or ArcGIS Enterprise to process, compress, and stream tiles. This model is expensive and challenging to scale. PMTiles and FlatGeobuf are changing this by introducing a fully serverless, cloud-native vector distribution paradigm.",
    sections: [
      {
        title: "1. The Magic of HTTP Range Requests",
        text: "How does a browser read a specific map tile from a single 50GB file stored in an S3 bucket without downloading the entire item? PMTiles leverages HTTP Range Requests. PMTiles is a single-file archive format containing a compact tile index at its header. When a user pans or zooms, the client reads the header, determines the offset of the specific tile, and requests only those specific bytes (e.g., bytes 105432-108221). This turns static cloud storage into an ultra-fast, cheap tileserver.",
      },
      {
        title: "2. FlatGeobuf: Readable Vector Streams",
        text: "For vector feature queries, Shapefiles and GeoJSONs are bottlenecks. GeoJSON is text-based and slow to compile in-browser, while Shapefiles are binary but obsolete. FlatGeobuf introduces a binary-encoded format based on FlatBuffers. It organizes vector features inside a spatial Hilbert R-tree index within the file. Clients can query and slice exact geometries (like specific country borders) directly using HTTP Range Requests, bypassing GIS middleware entirely.",
      },
    ],
    conclusion:
      "By storing data in cloud-native formats, GIS teams cut server maintenance, eliminate downtime, and stream maps to millions of concurrent clients for pennies.",
  },
  {
    id: "blog-06",
    title:
      "DuckDB Spatial: Running Lightning-Fast Geoprocessing in the Browser",
    excerpt:
      "The SQL database designed for analytical pipelines. How to run fast spatial overlays, coordinate conversions, and shape conversions in memory.",
    category: "cloudnative",
    categoryLabel: "Cloud Native Geospatial",
    author: "Zoe Lin, Head of Location Intelligence",
    date: "April 2026",
    duration: "7 min read",
    headerImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
    intro:
      "DuckDB is recognized as the 'SQLite for analytics' because of its vectorized execution engine and column-store speed. With the modern DuckDB Spatial Extension, it can execute heavy GIS analyses - including projection conversions and polygon intersections - on millions of rows right inside your browser.",
    sections: [
      {
        title: "1. Vectorized Vector Geometry Engine",
        text: "Traditional relational databases process transactions row-by-row. DuckDB organizes records in columns and processes them in blocks. When calculating spatial centers for a column of points, DuckDB leverages modern CPU instruction sets (like AVX) to perform calculations in parallel. This vectorized approach delivers speeds up to 100 times faster than conventional single-threaded row engines.",
      },
      {
        title: "2. Running In-Browser GIS with WebAssembly (WASM)",
        text: "By compiling DuckDB and its spatial extension into WebAssembly (WASM), developers can run complete GIS work hubs directly in the browser. Users can import local GeoJSONs, Excel, or CSV files, and write standard PostGIS-style SQL queries (using functions like `ST_Intersection` or `ST_Area`). The browser executes the entire analytical sequence and renders interactive map layers, entirely with client-side CPU.",
      },
    ],
    conclusion:
      "DuckDB WASM bridges the gap between client simplicity and server power, allowing developers to create highly interactive analytical GIS portals.",
  },
];

export const premiumGisTools = [
  {
    id: "tool-1",
    num: "1",
    icon: "FileSpreadsheet",
    title: "Cadastral & Land Parcel Management",
    subtitle: "Land parcel splitting, merging, valuation, & ownership tracking",
    excerpt:
      "A complete system to create, split, merge, and update land parcels with ownership history, valuation, and legal status. The single most used geospatial tool in every government worldwide — land registries, tax authorities, and courts depend on it daily.",
    description:
      "Process complex land plat split/merge requests, resolve spatial overlaps, compute real-time property values, and output legal-grade boundary registries.",
    details:
      "Maintains a secure, legal-grade digital registry of all property parcels. This module provides a single source of truth for land authorities, taxation departments, and judicial courts to track boundary legalities, easements, and ownership histories. Fully integrated with our Cloud Native Converter to import raw land plats.",
    thumbnail:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600",
    badge: "Cadastral Core",
  },
  {
    id: "tool-2",
    num: "2",
    icon: "MapPin",
    title: "Points of Interest & Facility Registry",
    subtitle:
      "Official centralized infrastructure, amenity, & facility catalog",
    excerpt:
      "A centrally maintained official database of every government facility — offices, hospitals, schools, courts, police stations — mapped with attributes, operating hours, jurisdiction, and capacity. The authoritative source all other systems reference.",
    description:
      "Centralize your enterprise administrative directories. Track public services, operating jurisdictions, live capacity matrices, and responder contact hierarchies.",
    details:
      "Organize, search, and update key administrative, public emergency, and utility facilities. By consolidating your physical infrastructure metadata into one spatial database connected to the Cloud Native Converter, other governmental sub-systems receive instant updates.",
    thumbnail:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=600",
    badge: "Authoritative POI",
  },
  {
    id: "tool-3",
    num: "3",
    icon: "Globe",
    title: "Basemap & Imagery Management",
    subtitle:
      "Self-hosted raster & vector tile servers powered by Cloud Native Converter",
    excerpt:
      "Authorities need to host, update, and serve their own official basemaps — not depend on Google or OpenStreetMap. National mapping agencies produce official topographic, cadastral, and aerial imagery that must be served securely within government infrastructure.",
    description:
      "Host high-definition sovereign vector and raster tiles on-prem or inside your private VPC. Translate raw GeoTIFF imagery and point clouds directly into client basemaps.",
    details:
      "Includes our high-efficiency Cloud Native Converter to ingest high-resolution aerial photography, digital elevation models, and custom terrain layers. Renders fluid topographic underlays instantly without leaking trace navigation parameters to external networks.",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600",
    badge: "Sovereign Basemaps",
  },
  {
    id: "tool-4",
    num: "4",
    icon: "Map",
    title: "Zoning & Land Use Planning Tool",
    subtitle:
      "Interactive urban zoning policies, density limits, & easement bounds",
    excerpt:
      "Define, visualize, and enforce official zoning regulations on a map — residential, commercial, industrial, agricultural, protected areas. Planning authorities use this to approve or reject any development application based on what the zone allows.",
    description:
      "Proactive urban zone policy mapping. Run automatic geospatial checks on incoming residential, commercial, and safety setback layout configurations.",
    details:
      "Delineate regional polygons and assign maximum density thresholds, noise limits, and structural height caps. The zoning tool performs spatial validation against incoming building plans inside the Cloud Native Converter workspace to confirm compliance instantly.",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600",
    badge: "Zoning & Planning",
  },
  {
    id: "tool-5",
    num: "5",
    icon: "History",
    title: "Change Detection & Version Control",
    subtitle:
      "Continuous spatial audit trails, historic slider rollback, & legal defensibility",
    excerpt:
      "Track every change made to any spatial data — who changed it, what it was before, and when. Authorities need a full history of boundary changes, parcel updates, and map edits for legal defensibility and audit compliance.",
    description:
      "Cryptographic, coordinate-level ledger systems. Document temporal modifications, plot adjustment histories, and user editing sessions automatically.",
    details:
      "Every coordinate alter, split action, or asset attribute modification compiles a cryptographic, chronological ledger. This ensures national cartographic agencies maintain a legally unassailable visual audit timeline powered by our Cloud Native Converter architecture.",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    badge: "Version Audits",
  },
  {
    id: "tool-6",
    num: "6",
    icon: "Cloud",
    title: "Cloud Native Converter & Tiles Compiler",
    subtitle: "On-the-fly spatial asset conversion & vector basemap generation",
    excerpt:
      "Ditch heavy desktop GIS pipelines. Ingest multiple spatial dataset formats like raster GeoTIFFs, orthomosaics, and LiDAR point clouds directly into standard vector tiles in real-time.",
    description:
      "High-speed serverless mapping compiler. Seamlessly convert Shapefiles, GeoJSON, LAS Point Clouds, and high-fidelity aerial photos into highly optimized multi-zoom tiles.",
    details:
      "Integrates with modern cloud-optimized layouts and data structures to compile responsive interactive tile catalogs securely, served natively across government spatial platforms with zero third-party dependencies.",
    thumbnail:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
  },
];

// Preset sample customer case study points
export const customersList = [
  {
    name: "Walmart Distribution Network",
    location: "Bentonville, AR",
    rowsScanned: "4.2 Billion rows",
    processingSpeedup: "312% faster",
    cloudCostSaved: "68% savings",
    description:
      "Optimized delivery route structures and loading dock clearance catchments across 4,500 postal tracts in near-realtime. Direct in-database queries on BigQuery eliminated massive latency spikes.",
    icon: "DatabaseZap",
  },
  {
    name: "Uber Freight Logistics",
    location: "Chicago, IL",
    rowsScanned: "9.1 Billion rows",
    processingSpeedup: "410% faster",
    cloudCostSaved: "75% savings",
    description:
      "Aggregated real-time highway corridor metrics on severe weather cells to re-route freight trucks on the fly. Leveraged Snowflake schema unions with Zero-Copy latency benchmarks.",
    icon: "Cpu",
  },
  {
    name: "City of New York Transit Group",
    location: "New York, NY",
    rowsScanned: "1.8 Billion rows",
    processingSpeedup: "280% faster",
    cloudCostSaved: "82% savings",
    description:
      "Modeled pedestrian accessibility ratios around new subway station clusters. Created spatial buffer rings to target municipal zoning and infrastructure layout accurately.",
    icon: "Users",
  },
];
