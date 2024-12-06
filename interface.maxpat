{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 9,
			"minor" : 0,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 174.0, 169.0, 918.0, 674.0 ],
		"openinpresentation" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1001.0, 12.0, 87.0, 22.0 ],
					"text" : "loadmess 0.08"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-4",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 422.0, 444.0, 70.0, 22.0 ],
					"text" : "loadmess 0"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 926.0, 529.0, 86.0, 22.0 ],
					"text" : "prepend name"
				}

			}
, 			{
				"box" : 				{
					"attr" : "dim",
					"id" : "obj-59",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 970.0, 205.0, 237.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 113.0, 614.0, 150.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 824.0, 71.0, 42.0, 20.0 ],
					"text" : "shape"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-48",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 113.0, 629.0, 150.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 824.0, 41.0, 84.0, 20.0 ],
					"text" : "loaded model"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 98.0, 614.0, 150.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 824.0, 10.0, 61.0, 20.0 ],
					"text" : "wireframe"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-42",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 932.0, 49.5, 87.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 848.0, 119.0, 87.0, 20.0 ],
					"text" : "scale speaker"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-38",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 875.0, 12.0, 106.0, 22.0 ],
					"text" : "loadmess set 0.25"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 422.0, 484.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 791.0, 39.0, 24.0, 24.0 ],
					"svg" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-30",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 422.0, 521.0, 61.0, 22.0 ],
					"text" : "enable $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-28",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 309.0, 484.0, 24.0, 24.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 791.0, 8.0, 24.0, 24.0 ],
					"svg" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-22",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 309.0, 521.0, 101.0, 22.0 ],
					"text" : "poly_mode $1 $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 8,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 71.0, 466.0, 92.5, 22.0 ],
					"text" : "jit.gl.material"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-15",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 71.0, 501.0, 181.0, 22.0 ],
					"text" : "jit.gl.model @file simpleroom.obj"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-14",
					"maxclass" : "jit.pwindow",
					"name" : "main",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 568.5, 435.5, 331.0, 247.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 9.0, 8.0, 771.0, 576.0 ],
					"sync" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-79",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 1027.0, 460.0, 58.0, 22.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-71",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 537.0, 748.0, 31.0, 22.0 ],
					"text" : "r ctx"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-67",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1027.0, 496.0, 35.0, 22.0 ],
					"text" : "main"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-65",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 1027.0, 529.0, 92.0, 22.0 ],
					"text" : "prepend drawto"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-64",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 105.0, 96.5, 31.0, 22.0 ],
					"text" : "r ctx"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-63",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 1027.0, 563.0, 33.0, 22.0 ],
					"text" : "s ctx"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 42.0, 748.0, 90.0, 22.0 ],
					"text" : "position 0. 0. 2."
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-21",
					"maxclass" : "preset",
					"numinlets" : 1,
					"numoutlets" : 5,
					"outlettype" : [ "preset", "int", "preset", "int", "" ],
					"patching_rect" : [ 972.0, 309.0, 100.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 795.0, 72.0, 16.016428023576736, 40.862425342202187 ],
					"preset_data" : [ 						{
							"number" : 1,
							"data" : [ 5, "obj-37", "attrui", "attr", "position", 7, "obj-37", "attrui", "list", 0.5, 0.5, 0.0, 5, "obj-39", "attrui", "attr", "rotatexyz", 7, "obj-39", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-57", "attrui", "attr", "auto_handle", 5, "obj-57", "attrui", "int", 1, 5, "obj-18", "attrui", "attr", "select_mode", 4, "obj-18", "attrui", "hilite", 5, "obj-17", "attrui", "attr", "hilite_color", 8, "obj-17", "attrui", "list", 1.0, 1.0, 0.0, 1.0, 5, "obj-12", "attrui", "attr", "hover", 5, "obj-12", "attrui", "int", 1, 5, "obj-68", "attrui", "attr", "position", 7, "obj-68", "attrui", "list", -0.5, 0.5, 0.0, 5, "obj-69", "attrui", "attr", "position", 7, "obj-69", "attrui", "list", 0.5, -0.5, 0.0, 5, "obj-70", "attrui", "attr", "position", 7, "obj-70", "attrui", "list", -0.5, -0.5, 0.0, 5, "obj-23", "toggle", "int", 1, 5, "obj-31", "attrui", "attr", "shape", 4, "obj-31", "attrui", "cone", 5, "obj-34", "attrui", "attr", "scale", 7, "obj-34", "attrui", "list", 0.25, 0.25, 0.25, 5, "obj-35", "attrui", "attr", "rotatexyz", 7, "obj-35", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-36", "attrui", "attr", "rotatexyz", 7, "obj-36", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-40", "attrui", "attr", "rotatexyz", 7, "obj-40", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-28", "toggle", "int", 0, 5, "obj-33", "toggle", "int", 0, 5, "obj-59", "attrui", "attr", "dim", 6, "obj-59", "attrui", "list", 20, 20 ]
						}
, 						{
							"number" : 2,
							"data" : [ 5, "obj-37", "attrui", "attr", "position", 7, "obj-37", "attrui", "list", 0.5, 0.5, 0.0, 5, "obj-39", "attrui", "attr", "rotatexyz", 7, "obj-39", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-57", "attrui", "attr", "auto_handle", 5, "obj-57", "attrui", "int", 1, 5, "obj-18", "attrui", "attr", "select_mode", 4, "obj-18", "attrui", "hilite", 5, "obj-17", "attrui", "attr", "hilite_color", 8, "obj-17", "attrui", "list", 1.0, 1.0, 0.0, 1.0, 5, "obj-12", "attrui", "attr", "hover", 5, "obj-12", "attrui", "int", 1, 5, "obj-68", "attrui", "attr", "position", 7, "obj-68", "attrui", "list", -0.5, 0.5, 0.0, 5, "obj-69", "attrui", "attr", "position", 7, "obj-69", "attrui", "list", 0.5, -0.5, 0.0, 5, "obj-70", "attrui", "attr", "position", 7, "obj-70", "attrui", "list", -0.5, -0.5, 0.0, 5, "obj-23", "toggle", "int", 1, 5, "obj-31", "attrui", "attr", "shape", 4, "obj-31", "attrui", "torus", 5, "obj-34", "attrui", "attr", "scale", 7, "obj-34", "attrui", "list", 0.25, 0.25, 0.25, 5, "obj-35", "attrui", "attr", "rotatexyz", 7, "obj-35", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-36", "attrui", "attr", "rotatexyz", 7, "obj-36", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-40", "attrui", "attr", "rotatexyz", 7, "obj-40", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-28", "toggle", "int", 0, 5, "obj-33", "toggle", "int", 0, 5, "obj-59", "attrui", "attr", "dim", 6, "obj-59", "attrui", "list", 60, 60 ]
						}
, 						{
							"number" : 3,
							"data" : [ 5, "obj-37", "attrui", "attr", "position", 7, "obj-37", "attrui", "list", 0.5, 0.5, 0.0, 5, "obj-39", "attrui", "attr", "rotatexyz", 7, "obj-39", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-57", "attrui", "attr", "auto_handle", 5, "obj-57", "attrui", "int", 1, 5, "obj-18", "attrui", "attr", "select_mode", 4, "obj-18", "attrui", "hilite", 5, "obj-17", "attrui", "attr", "hilite_color", 8, "obj-17", "attrui", "list", 1.0, 1.0, 0.0, 1.0, 5, "obj-12", "attrui", "attr", "hover", 5, "obj-12", "attrui", "int", 1, 5, "obj-68", "attrui", "attr", "position", 7, "obj-68", "attrui", "list", -0.5, 0.5, 0.0, 5, "obj-69", "attrui", "attr", "position", 7, "obj-69", "attrui", "list", 0.5, -0.5, 0.0, 5, "obj-70", "attrui", "attr", "position", 7, "obj-70", "attrui", "list", -0.5, -0.5, 0.0, 5, "obj-23", "toggle", "int", 1, 5, "obj-31", "attrui", "attr", "shape", 4, "obj-31", "attrui", "sphere", 5, "obj-34", "attrui", "attr", "scale", 7, "obj-34", "attrui", "list", 0.25, 0.25, 0.25, 5, "obj-35", "attrui", "attr", "rotatexyz", 7, "obj-35", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-36", "attrui", "attr", "rotatexyz", 7, "obj-36", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-40", "attrui", "attr", "rotatexyz", 7, "obj-40", "attrui", "list", 0.0, 0.0, 0.0, 5, "obj-28", "toggle", "int", 0, 5, "obj-33", "toggle", "int", 0, 5, "obj-59", "attrui", "attr", "dim", 6, "obj-59", "attrui", "list", 60, 60 ]
						}
 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "rotatexyz",
					"id" : "obj-40",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 567.0, 402.0, 334.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "rotatexyz",
					"id" : "obj-36",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 567.0, 332.5, 334.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "rotatexyz",
					"id" : "obj-35",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 567.0, 259.0, 334.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "scale",
					"id" : "obj-34",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 567.0, 121.5, 290.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "shape",
					"id" : "obj-31",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 567.0, 89.5, 150.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 437.0, 965.0, 150.0, 20.0 ],
					"text" : "cane"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 47.0, 865.0, 26.0, 26.0 ],
					"svg" : ""
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-20",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 47.0, 909.0, 69.0, 23.0 ],
					"text" : "enable $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-25",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_gl_texture", "" ],
					"patching_rect" : [ 325.0, 909.0, 677.0, 23.0 ],
					"text" : "jit.gl.camera @viewport 0.5 0.5 0.5 0.5 @ortho 2 @position 2. 0. 0. @rotatexyz 0. 90. 0. @erase_color 0.9 0.9 0.9 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-26",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_gl_texture", "" ],
					"patching_rect" : [ 42.0, 791.0, 441.0, 23.0 ],
					"text" : "jit.gl.camera @viewport 0 0.5 0.5 0.5 @ortho 2 @erase_color 0.9 0.9 0.9 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-24",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_gl_texture", "" ],
					"patching_rect" : [ 160.0, 1020.0, 674.0, 23.0 ],
					"text" : "jit.gl.camera @viewport 0.5 0 0.5 0.5 @ortho 2 @position 0. 2. 0. @rotatexyz 270. 0. 0. @erase_color 0.9 0.9 0.9 1."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_gl_texture", "" ],
					"patching_rect" : [ 47.0, 979.0, 718.0, 23.0 ],
					"text" : "jit.gl.camera @viewport 0 0 0.5 0.5 @ortho 2 @rotatexyz -30. 30. 0. @position 1.18 1.36 2. @erase_color 0.75 0.75 0.75 1."
				}

			}
, 			{
				"box" : 				{
					"attr" : "position",
					"id" : "obj-70",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 567.0, 368.5, 334.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "position",
					"id" : "obj-69",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 567.0, 303.0, 334.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "position",
					"id" : "obj-68",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 567.0, 229.5, 334.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-13",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 149.0, 250.0, 388.0, 23.0 ],
					"text" : "jit.gl.gridshape @shape sphere @position -0.5 -0.5 0 @scale 0.25"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-51",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 149.0, 229.0, 384.0, 23.0 ],
					"text" : "jit.gl.gridshape @shape sphere @position 0.5 -0.5 0 @scale 0.25"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 149.0, 208.0, 384.0, 23.0 ],
					"text" : "jit.gl.gridshape @shape sphere @position -0.5 0.5 0 @scale 0.25"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-52",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 149.0, 187.0, 380.0, 23.0 ],
					"text" : "jit.gl.gridshape @shape sphere @position 0.5 0.5 0 @scale 0.25"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 8,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 23.0, 154.0, 95.0, 23.0 ],
					"text" : "jit.gl.material"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-53",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "bang", "" ],
					"patching_rect" : [ 149.0, 154.0, 73.0, 23.0 ],
					"text" : "jit.gl.render"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-54",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "bang", "erase" ],
					"patching_rect" : [ 149.0, 121.0, 63.0, 23.0 ],
					"text" : "t b erase"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-55",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 149.0, 96.0, 129.0, 23.0 ],
					"text" : "qmetro 33 @active 1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-56",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 333.0, 154.0, 140.0, 23.0 ],
					"text" : "jit.gl.handle @hover 1"
				}

			}
, 			{
				"box" : 				{
					"attr" : "hover",
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-12",
					"lock" : 1,
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 333.0, 61.0, 90.0, 23.0 ],
					"text_width" : 59.0
				}

			}
, 			{
				"box" : 				{
					"attr" : "hilite_color",
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-17",
					"lock" : 1,
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 333.0, 121.0, 170.0, 23.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "select_mode",
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-18",
					"lock" : 1,
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 333.0, 96.0, 170.0, 23.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "auto_handle",
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 13.0,
					"id" : "obj-57",
					"lock" : 1,
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 333.0, 26.0, 130.0, 23.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "newobj",
					"numinlets" : 3,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 875.0, 84.5, 54.0, 22.0 ],
					"text" : "pack f f f"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-46",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 875.0, 121.5, 84.0, 22.0 ],
					"text" : "prepend scale"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-45",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 875.0, 48.5, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 791.0, 118.0, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "rotatexyz",
					"id" : "obj-39",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 567.0, 187.5, 334.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"attr" : "position",
					"id" : "obj-37",
					"maxclass" : "attrui",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 567.0, 160.5, 334.0, 22.0 ]
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"order" : 2,
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"order" : 1,
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"order" : 0,
					"source" : [ "obj-20", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 0 ],
					"source" : [ "obj-21", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-20", 0 ],
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-22", 0 ],
					"source" : [ "obj-28", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"order" : 2,
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"order" : 0,
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"order" : 1,
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"order" : 3,
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-30", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"midpoints" : [ 576.5, 114.0, 528.0, 114.0, 528.0, 285.0, 135.0, 285.0, 135.0, 204.0, 158.5, 204.0 ],
					"order" : 2,
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"midpoints" : [ 576.5, 114.0, 528.0, 114.0, 528.0, 285.0, 135.0, 285.0, 135.0, 246.0, 158.5, 246.0 ],
					"order" : 0,
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"midpoints" : [ 576.5, 114.0, 528.0, 114.0, 528.0, 285.0, 135.0, 285.0, 135.0, 225.0, 158.5, 225.0 ],
					"order" : 1,
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"midpoints" : [ 576.5, 114.0, 528.0, 114.0, 528.0, 285.0, 135.0, 285.0, 135.0, 183.0, 158.5, 183.0 ],
					"order" : 3,
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-30", 0 ],
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"midpoints" : [ 576.5, 144.0, 528.0, 144.0, 528.0, 285.0, 135.0, 285.0, 135.0, 204.0, 158.5, 204.0 ],
					"order" : 2,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"midpoints" : [ 576.5, 144.0, 528.0, 144.0, 528.0, 285.0, 135.0, 285.0, 135.0, 246.0, 158.5, 246.0 ],
					"order" : 0,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"midpoints" : [ 576.5, 144.0, 528.0, 144.0, 528.0, 285.0, 135.0, 285.0, 135.0, 225.0, 158.5, 225.0 ],
					"order" : 1,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"midpoints" : [ 576.5, 144.0, 528.0, 144.0, 528.0, 285.0, 135.0, 285.0, 135.0, 183.0, 158.5, 183.0 ],
					"order" : 3,
					"source" : [ "obj-34", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"midpoints" : [ 576.5, 282.0, 135.0, 282.0, 135.0, 204.0, 158.5, 204.0 ],
					"source" : [ "obj-35", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"midpoints" : [ 576.5, 357.0, 297.0, 357.0, 297.0, 285.0, 135.0, 285.0, 135.0, 225.0, 158.5, 225.0 ],
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"midpoints" : [ 576.5, 183.0, 528.0, 183.0, 528.0, 285.0, 135.0, 285.0, 135.0, 183.0, 158.5, 183.0 ],
					"source" : [ "obj-37", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 0 ],
					"source" : [ "obj-38", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"midpoints" : [ 576.5, 210.0, 528.0, 210.0, 528.0, 285.0, 135.0, 285.0, 135.0, 183.0, 158.5, 183.0 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-33", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"midpoints" : [ 576.5, 426.0, 435.0, 426.0, 435.0, 285.0, 135.0, 285.0, 135.0, 246.0, 158.5, 246.0 ],
					"source" : [ "obj-40", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 2 ],
					"order" : 0,
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 1 ],
					"order" : 1,
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-47", 0 ],
					"order" : 2,
					"source" : [ "obj-45", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"midpoints" : [ 884.5, 144.0, 858.0, 144.0, 858.0, 75.0, 528.0, 75.0, 528.0, 285.0, 135.0, 285.0, 135.0, 204.0, 158.5, 204.0 ],
					"order" : 2,
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"midpoints" : [ 884.5, 144.0, 858.0, 144.0, 858.0, 75.0, 528.0, 75.0, 528.0, 285.0, 135.0, 285.0, 135.0, 246.0, 158.5, 246.0 ],
					"order" : 0,
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"midpoints" : [ 884.5, 144.0, 858.0, 144.0, 858.0, 75.0, 528.0, 75.0, 528.0, 285.0, 135.0, 285.0, 135.0, 225.0, 158.5, 225.0 ],
					"order" : 1,
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"midpoints" : [ 884.5, 144.0, 858.0, 144.0, 858.0, 75.0, 435.0, 75.0, 435.0, 84.0, 288.0, 84.0, 288.0, 174.0, 222.0, 174.0, 222.0, 180.0, 158.5, 180.0 ],
					"order" : 3,
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 0 ],
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-53", 0 ],
					"midpoints" : [ 202.5, 149.5, 158.5, 149.5 ],
					"source" : [ "obj-54", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-53", 0 ],
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-54", 0 ],
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"source" : [ "obj-57", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"order" : 2,
					"source" : [ "obj-59", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"order" : 0,
					"source" : [ "obj-59", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"order" : 1,
					"source" : [ "obj-59", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"order" : 3,
					"source" : [ "obj-59", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"order" : 2,
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"order" : 0,
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"order" : 1,
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-52", 0 ],
					"order" : 3,
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-53", 0 ],
					"order" : 4,
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-63", 0 ],
					"source" : [ "obj-65", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"order" : 1,
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-65", 0 ],
					"order" : 0,
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"midpoints" : [ 576.5, 252.0, 528.0, 252.0, 528.0, 285.0, 135.0, 285.0, 135.0, 204.0, 158.5, 204.0 ],
					"source" : [ "obj-68", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-51", 0 ],
					"midpoints" : [ 576.5, 327.0, 297.0, 327.0, 297.0, 285.0, 135.0, 285.0, 135.0, 225.0, 158.5, 225.0 ],
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"midpoints" : [ 576.5, 393.0, 297.0, 393.0, 297.0, 285.0, 135.0, 285.0, 135.0, 246.0, 158.5, 246.0 ],
					"source" : [ "obj-70", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"order" : 2,
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"order" : 1,
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"order" : 0,
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-26", 0 ],
					"order" : 3,
					"source" : [ "obj-71", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-67", 0 ],
					"source" : [ "obj-79", 0 ]
				}

			}
 ],
		"originid" : "pat-429",
		"dependency_cache" : [  ],
		"autosave" : 0
	}

}
